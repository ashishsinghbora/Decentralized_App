export type UpiPaymentRequest = {
  payerDid: string;
  payeeVpa: string;
  amountInPaise: number;
  note: string;
  roomId: string;
};

export type UpiPaymentResult = {
  transactionId: string;
  status: "initiated" | "success" | "failed";
  riskScore: number;
};

export interface UpiProvider {
  initiate(request: UpiPaymentRequest): Promise<UpiPaymentResult>;
}

export class PaymentsService {
  constructor(private readonly provider: UpiProvider) {}

  async sendPeerPayment(request: UpiPaymentRequest): Promise<UpiPaymentResult> {
    if (request.amountInPaise <= 0) {
      throw new Error("Payment amount must be positive");
    }
    if (!request.payeeVpa.includes("@")) {
      throw new Error("Invalid UPI VPA");
    }
    return this.provider.initiate(request);
  }
}
