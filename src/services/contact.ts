export type ContactPayload = {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const DEFAULT_ENDPOINT = 'https://formsubmit.co/ajax/info@cakirinsaat.com.tr';

export async function sendContactMessage(payload: ContactPayload) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || DEFAULT_ENDPOINT;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      _template: 'table',
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Mesaj gönderimi başarısız oldu.');
  }

  return response.json().catch(() => ({}));
}
