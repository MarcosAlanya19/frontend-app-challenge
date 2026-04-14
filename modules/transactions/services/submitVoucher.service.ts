export interface ISubmitVoucherPayload {
  transactionId: string;
  fileName: string;
  fileUri: string;
}

export interface ISubmitVoucher {
  payload: ISubmitVoucherPayload;
}

export interface ISubmitVoucherResponse {
  success: boolean;
}

export const submitVoucher = (
  _: ISubmitVoucher,
): Promise<{ data: ISubmitVoucherResponse }> =>
  Promise.resolve({ data: { success: true } });
