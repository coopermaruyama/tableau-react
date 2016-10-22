import url from 'url';

function tokenizeUrl(_url, token) {
  const parsed = url.parse(_url, true);
  const { protocol, host, pathname } = parsed;

  return `${protocol}//${host}/trusted/${token}${pathname}`;
}

export default tokenizeUrl;
