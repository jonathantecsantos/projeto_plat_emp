import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Footer = () => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo.username)

  return (
    <footer className="text-gray-600 flex justify-end items-center py-2 fixed w-screen bottom-0 text-xs -z-10 print:hidden">
      <div className="text-center px-2">
        {userGlobalState} Online Version: {import.meta.env.VITE_APP_VERSION}
      </div>
    </footer>
  );
}

export default Footer;
