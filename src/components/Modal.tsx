import styled from "./Modal.module.css";

type ModalProps = {
  subtotal: number;
  handlePurchase: () => void;
};

const Modal = ({ subtotal, handlePurchase }: ModalProps) => {
  return (
    <>
      <label
        htmlFor="my_modal_6"
        className="btn mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
      >
        구매
      </label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className={`${styled.modalBox} modal-box`}>
          <h3 className="font-bold text-lg">정말로 구매하시겠습니까?</h3>
          <p className="py-4">장바구니의 상품들이 사라집니다.</p>
          <p className="py-4 font-bold">총합 : ${(subtotal + 4.99).toFixed(2)} USD</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn bg-gray-300" onClick={handlePurchase}>
              구매
            </label>
            <label htmlFor="my_modal_6" className="btn">
              취소
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;