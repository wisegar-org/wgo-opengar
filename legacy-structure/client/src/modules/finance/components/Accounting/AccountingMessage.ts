export function senFailNotifyMessage(
  notify: (config: any) => unknown,
  msg: string
) {
  notify({
    message: msg,
    type: 'negative'
  });
}

export function sendNotifyMesagge(
  status: boolean,
  notify: (config: any) => unknown,
  success: string,
  fail: string
) {
  if (status) {
    notify({
      message: success,
      type: 'positive'
    });
  } else {
    notify({
      message: fail,
      type: 'negative'
    });
  }
}
