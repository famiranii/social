import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalItem {
  isOpen: boolean;
  modalName: string;
}

interface UIState {
  modals: ModalItem[];
  ishandleDropdownsOpen:boolean
}

const initialState: UIState = {
  modals: [],
  ishandleDropdownsOpen:false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      const m = state.modals.find((x) => x.modalName === action.payload);
      if (m) m.isOpen = true;
      else state.modals.push({ modalName: action.payload, isOpen: true });
    },

    closeModal: (state, action: PayloadAction<string>) => {
      const m = state.modals.find((x) => x.modalName === action.payload);
      if (m) m.isOpen = false;
    },

    handleDropdownsOpen : (state , action : PayloadAction<boolean>)=>{
      state.ishandleDropdownsOpen = action.payload
    }
  },
});

export const { openModal, closeModal , handleDropdownsOpen } = uiSlice.actions;
export default uiSlice.reducer;
