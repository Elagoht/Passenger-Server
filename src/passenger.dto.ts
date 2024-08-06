export class AuthRequest {
  username: string;
  passphrase: string;
}

export class ResetMasterPassphraseRequest extends AuthRequest {
  newPassphrase: string;
}

export class PassphraseEntryRequest {
  identity: string;
  platform: string;
  url: string;
  passphrase: string;
  notes: string;
}

export class ManipulateRequest {
  passphrase: string;
}
