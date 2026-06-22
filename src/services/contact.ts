export type ContactPayload = {
  fullName: string;
  phone: string;
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
      subject: payload.subject,
      message: payload.message,
      _template: 'table',
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Mesaj gönderimi başarısız oldu.');
  }

  const result = await response.json().catch(() => ({} as { success?: boolean | string; message?: string }));

  // FormSubmit bazı hatalarda HTTP 200 döndürse de success=false ile hata bilgisini iletiyor.
  if (result && typeof result === 'object' && 'success' in result) {
    const isSuccess = result.success === true || result.success === 'true';
    if (!isSuccess) {
      throw new Error(result.message || 'Form henüz aktif değil veya gönderim başarısız oldu.');
    }
  }

  return result;
}
