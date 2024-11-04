
const Footer = () => {
  // const userGlobalState = useSelector((state: RootState) => state.userInfo.data.username)


  return (
    <footer className="text-gray-600 flex justify-end items-center py-2 fixed w-screen bottom-0 text-xs -z-10">
      <div className="text-center px-2">
        {/* {userGlobalState} Online Version: {import.meta.env.VITE_APP_VERSION} */}
      </div>
    </footer>
  );
}

export default Footer;
