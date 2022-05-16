// domains
export const apiDomain = '';
export const frontEndDomain = '';

// user account management urls
export const authenticationUrl = apiDomain + '';
export const changePasswordUrl = apiDomain + '';
export const sendChangePasswordTokenUrl = apiDomain + '';
export const activateAccounturl = apiDomain + '';

// content types

export const content_types = {
  json: 'application/json',
  formdata: 'multipart/form-data',
  text: 'text/plain',
};

// request headers
export const requestHeaderWithBodyAfterAuthentication = (
  method,
  body,
  token,
  content_type
) => ({
  method,
  mode: 'cors',
  headers: {
    Authorization: 'Bearer ' + token,
    Accept: content_type,
  },
  body,
});

export const requestHeaderWithJSONBodyAfterAuthentication = (
  method,
  body,
  token,
  content_type
) => ({
  method,
  mode: 'cors',
  headers: {
    Authorization: 'Bearer ' + token,
    Accept: content_type,
    'Content-Type': content_type,
  },
  body: JSON.stringify(body),
});

export const requestHeaderWithoutBodyAfterAuthentication = (
  token,
  content_type
) => ({
  method: 'GET',
  mode: 'cors',
  headers: {
    Accept: content_type,
    'Content-Type': content_type,
    Authorization: 'Bearer ' + token,
  },
});

export const requestHeaderWithBodyBeforeAuthentication = (
  payload,
  content_type
) => ({
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': content_type,
    // "Access-Control-Allow-Origin": "**"
  },
  body: JSON.stringify(payload),
});
