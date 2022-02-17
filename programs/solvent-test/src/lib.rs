use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::UnixTimestamp;

declare_id!("Hc21T1SYR1nNG4h8T5CGvPJXg1LSNHTTUik99n9wU59h");

#[program]
pub mod solvent_test {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
