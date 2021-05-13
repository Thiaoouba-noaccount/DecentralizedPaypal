// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Deposited extends ethereum.Event {
  get params(): Deposited__Params {
    return new Deposited__Params(this);
  }
}

export class Deposited__Params {
  _event: Deposited;

  constructor(event: Deposited) {
    this._event = event;
  }

  get orderid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get payer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get orderid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Refund extends ethereum.Event {
  get params(): Refund__Params {
    return new Refund__Params(this);
  }
}

export class Refund__Params {
  _event: Refund;

  constructor(event: Refund) {
    this._event = event;
  }

  get orderid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get payer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ReleaseFund extends ethereum.Event {
  get params(): ReleaseFund__Params {
    return new ReleaseFund__Params(this);
  }
}

export class ReleaseFund__Params {
  _event: ReleaseFund;

  constructor(event: ReleaseFund) {
    this._event = event;
  }

  get orderid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class PendingFund extends ethereum.Event {
  get params(): PendingFund__Params {
    return new PendingFund__Params(this);
  }
}

export class PendingFund__Params {
  _event: PendingFund;

  constructor(event: PendingFund) {
    this._event = event;
  }

  get orderid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ActiveFund extends ethereum.Event {
  get params(): ActiveFund__Params {
    return new ActiveFund__Params(this);
  }
}

export class ActiveFund__Params {
  _event: ActiveFund;

  constructor(event: ActiveFund) {
    this._event = event;
  }

  get orderid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class EnableRefund extends ethereum.Event {
  get params(): EnableRefund__Params {
    return new EnableRefund__Params(this);
  }
}

export class EnableRefund__Params {
  _event: EnableRefund;

  constructor(event: EnableRefund) {
    this._event = event;
  }

  get orderid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ArbitratorWithdraw extends ethereum.Event {
  get params(): ArbitratorWithdraw__Params {
    return new ArbitratorWithdraw__Params(this);
  }
}

export class ArbitratorWithdraw__Params {
  _event: ArbitratorWithdraw;

  constructor(event: ArbitratorWithdraw) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get payment(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ArbitratorAdded extends ethereum.Event {
  get params(): ArbitratorAdded__Params {
    return new ArbitratorAdded__Params(this);
  }
}

export class ArbitratorAdded__Params {
  _event: ArbitratorAdded;

  constructor(event: ArbitratorAdded) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ArbitratorRemoved extends ethereum.Event {
  get params(): ArbitratorRemoved__Params {
    return new ArbitratorRemoved__Params(this);
  }
}

export class ArbitratorRemoved__Params {
  _event: ArbitratorRemoved;

  constructor(event: ArbitratorRemoved) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class PrimaryTransferred extends ethereum.Event {
  get params(): PrimaryTransferred__Params {
    return new PrimaryTransferred__Params(this);
  }
}

export class PrimaryTransferred__Params {
  _event: PrimaryTransferred;

  constructor(event: PrimaryTransferred) {
    this._event = event;
  }

  get recipient(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Paypal extends ethereum.SmartContract {
  static bind(address: Address): Paypal {
    return new Paypal("Paypal", address);
  }

  isArbitrator(account: Address): boolean {
    let result = super.call("isArbitrator", "isArbitrator(address):(bool)", [
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_isArbitrator(account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isArbitrator", "isArbitrator(address):(bool)", [
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  primary(): Address {
    let result = super.call("primary", "primary():(address)", []);

    return result[0].toAddress();
  }

  try_primary(): ethereum.CallResult<Address> {
    let result = super.tryCall("primary", "primary():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  depositsOf(orderid: BigInt): BigInt {
    let result = super.call("depositsOf", "depositsOf(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);

    return result[0].toBigInt();
  }

  try_depositsOf(orderid: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("depositsOf", "depositsOf(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  payee(orderid: BigInt): Address {
    let result = super.call("payee", "payee(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);

    return result[0].toAddress();
  }

  try_payee(orderid: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("payee", "payee(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  payer(orderid: BigInt): Address {
    let result = super.call("payer", "payer(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);

    return result[0].toAddress();
  }

  try_payer(orderid: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("payer", "payer(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  expire(orderid: BigInt): BigInt {
    let result = super.call("expire", "expire(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);

    return result[0].toBigInt();
  }

  try_expire(orderid: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("expire", "expire(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  state(orderid: BigInt): i32 {
    let result = super.call("state", "state(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);

    return result[0].toI32();
  }

  try_state(orderid: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall("state", "state(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(orderid)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  deposit(
    token: Address,
    recipient: Address,
    amount: BigInt,
    orderid: BigInt
  ): boolean {
    let result = super.call(
      "deposit",
      "deposit(address,address,uint256,uint256):(bool)",
      [
        ethereum.Value.fromAddress(token),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromUnsignedBigInt(orderid)
      ]
    );

    return result[0].toBoolean();
  }

  try_deposit(
    token: Address,
    recipient: Address,
    amount: BigInt,
    orderid: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "deposit",
      "deposit(address,address,uint256,uint256):(bool)",
      [
        ethereum.Value.fromAddress(token),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromUnsignedBigInt(orderid)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class AddArbitratorCall extends ethereum.Call {
  get inputs(): AddArbitratorCall__Inputs {
    return new AddArbitratorCall__Inputs(this);
  }

  get outputs(): AddArbitratorCall__Outputs {
    return new AddArbitratorCall__Outputs(this);
  }
}

export class AddArbitratorCall__Inputs {
  _call: AddArbitratorCall;

  constructor(call: AddArbitratorCall) {
    this._call = call;
  }

  get account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddArbitratorCall__Outputs {
  _call: AddArbitratorCall;

  constructor(call: AddArbitratorCall) {
    this._call = call;
  }
}

export class TransferPrimaryCall extends ethereum.Call {
  get inputs(): TransferPrimaryCall__Inputs {
    return new TransferPrimaryCall__Inputs(this);
  }

  get outputs(): TransferPrimaryCall__Outputs {
    return new TransferPrimaryCall__Outputs(this);
  }
}

export class TransferPrimaryCall__Inputs {
  _call: TransferPrimaryCall;

  constructor(call: TransferPrimaryCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferPrimaryCall__Outputs {
  _call: TransferPrimaryCall;

  constructor(call: TransferPrimaryCall) {
    this._call = call;
  }
}

export class RenounceArbitratorCall extends ethereum.Call {
  get inputs(): RenounceArbitratorCall__Inputs {
    return new RenounceArbitratorCall__Inputs(this);
  }

  get outputs(): RenounceArbitratorCall__Outputs {
    return new RenounceArbitratorCall__Outputs(this);
  }
}

export class RenounceArbitratorCall__Inputs {
  _call: RenounceArbitratorCall;

  constructor(call: RenounceArbitratorCall) {
    this._call = call;
  }
}

export class RenounceArbitratorCall__Outputs {
  _call: RenounceArbitratorCall;

  constructor(call: RenounceArbitratorCall) {
    this._call = call;
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class SetExpiryDateCall extends ethereum.Call {
  get inputs(): SetExpiryDateCall__Inputs {
    return new SetExpiryDateCall__Inputs(this);
  }

  get outputs(): SetExpiryDateCall__Outputs {
    return new SetExpiryDateCall__Outputs(this);
  }
}

export class SetExpiryDateCall__Inputs {
  _call: SetExpiryDateCall;

  constructor(call: SetExpiryDateCall) {
    this._call = call;
  }

  get orderid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get expiry(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetExpiryDateCall__Outputs {
  _call: SetExpiryDateCall;

  constructor(call: SetExpiryDateCall) {
    this._call = call;
  }
}

export class ArbitratorWithdrawCall extends ethereum.Call {
  get inputs(): ArbitratorWithdrawCall__Inputs {
    return new ArbitratorWithdrawCall__Inputs(this);
  }

  get outputs(): ArbitratorWithdrawCall__Outputs {
    return new ArbitratorWithdrawCall__Outputs(this);
  }
}

export class ArbitratorWithdrawCall__Inputs {
  _call: ArbitratorWithdrawCall;

  constructor(call: ArbitratorWithdrawCall) {
    this._call = call;
  }
}

export class ArbitratorWithdrawCall__Outputs {
  _call: ArbitratorWithdrawCall;

  constructor(call: ArbitratorWithdrawCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get orderid(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class ReleaseFundCall extends ethereum.Call {
  get inputs(): ReleaseFundCall__Inputs {
    return new ReleaseFundCall__Inputs(this);
  }

  get outputs(): ReleaseFundCall__Outputs {
    return new ReleaseFundCall__Outputs(this);
  }
}

export class ReleaseFundCall__Inputs {
  _call: ReleaseFundCall;

  constructor(call: ReleaseFundCall) {
    this._call = call;
  }

  get orderid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ReleaseFundCall__Outputs {
  _call: ReleaseFundCall;

  constructor(call: ReleaseFundCall) {
    this._call = call;
  }
}

export class PendingFundCall extends ethereum.Call {
  get inputs(): PendingFundCall__Inputs {
    return new PendingFundCall__Inputs(this);
  }

  get outputs(): PendingFundCall__Outputs {
    return new PendingFundCall__Outputs(this);
  }
}

export class PendingFundCall__Inputs {
  _call: PendingFundCall;

  constructor(call: PendingFundCall) {
    this._call = call;
  }

  get orderid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class PendingFundCall__Outputs {
  _call: PendingFundCall;

  constructor(call: PendingFundCall) {
    this._call = call;
  }
}

export class ActiveFundCall extends ethereum.Call {
  get inputs(): ActiveFundCall__Inputs {
    return new ActiveFundCall__Inputs(this);
  }

  get outputs(): ActiveFundCall__Outputs {
    return new ActiveFundCall__Outputs(this);
  }
}

export class ActiveFundCall__Inputs {
  _call: ActiveFundCall;

  constructor(call: ActiveFundCall) {
    this._call = call;
  }

  get orderid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ActiveFundCall__Outputs {
  _call: ActiveFundCall;

  constructor(call: ActiveFundCall) {
    this._call = call;
  }
}

export class EnableRefundCall extends ethereum.Call {
  get inputs(): EnableRefundCall__Inputs {
    return new EnableRefundCall__Inputs(this);
  }

  get outputs(): EnableRefundCall__Outputs {
    return new EnableRefundCall__Outputs(this);
  }
}

export class EnableRefundCall__Inputs {
  _call: EnableRefundCall;

  constructor(call: EnableRefundCall) {
    this._call = call;
  }

  get orderid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EnableRefundCall__Outputs {
  _call: EnableRefundCall;

  constructor(call: EnableRefundCall) {
    this._call = call;
  }
}

export class RefundCall extends ethereum.Call {
  get inputs(): RefundCall__Inputs {
    return new RefundCall__Inputs(this);
  }

  get outputs(): RefundCall__Outputs {
    return new RefundCall__Outputs(this);
  }
}

export class RefundCall__Inputs {
  _call: RefundCall;

  constructor(call: RefundCall) {
    this._call = call;
  }

  get orderid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RefundCall__Outputs {
  _call: RefundCall;

  constructor(call: RefundCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get orderid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}