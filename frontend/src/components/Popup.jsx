import { VscPassFilled } from "react-icons/vsc";

export const Popup = ({ text, color }) => {
  return (
    <div className="popup">
      <div
        className="max-w-xs px-2 bg-white border shadow-lg rounded-lg"
        style={{ maxWidth: "200px" }}
      >
        <div className="flex items-center justify-between p-3">
          <strong className="text-sm font-semibold mr-2">{text}</strong>
          <VscPassFilled className="ml-auto" color={color} size={20} />
        </div>
      </div>
    </div>
  );
};
