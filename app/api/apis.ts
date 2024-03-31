import api from ".";

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMyZWQwZTNiLTFlMGEtNDNhMC1iYjQyLTk4OTlmZDY0MTNlOSIsImV4cCI6MTcxMTk0Mzg1MCwiYXBwIjoibmV3bmVla2FwcCJ9.lIeZ7QxMFZp-8qqUMHSKp2qGWsOPyixqBMpHXZn2PME'

export async function createPhoto (
    formData?: any
  ) {
    const uri = '/community/media';
    const { data } = await api.post(uri, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      transformRequest: () => {
        return formData;
      },
    });
    return data;
  };