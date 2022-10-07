import { Modal } from "antd";

const MyOrderQuoteModal = (props) => {
  return (
    <Modal
      title=""
      visible={true}
      onCancel={() => {}}
      onOk={props.onOk}
      className="myOrderQuoteModal"
      width={600}
      footer={null}
    >
      <div>Order Quote Modal</div>
    </Modal>
  );
};
