type FormatCodeToIframeResponse = {
  [key: string]: string;
};

export const formatCodeToIframe = (
  value: string
): FormatCodeToIframeResponse => ({
  html: value,
  css: `<style>${value}</style>`,
  javascript: `<script>${value}</script>`,
});
