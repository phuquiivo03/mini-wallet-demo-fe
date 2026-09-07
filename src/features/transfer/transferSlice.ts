import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TransferState = {
  transferState: "idle" | "processing" | "done" | "failed";
};

const initialState: TransferState = {
  transferState: "idle",
};

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setTransferState: (
      state,
      action: PayloadAction<"idle" | "processing" | "done" | "failed">,
    ) => {
      state.transferState = action.payload;
    },
  },
});

export const { setTransferState } = transferSlice.actions;

export default transferSlice.reducer;
