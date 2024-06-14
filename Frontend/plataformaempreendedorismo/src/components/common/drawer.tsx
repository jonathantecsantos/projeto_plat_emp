import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";


export const DrawerComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return <>
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {/* {<LeftMenuComponent />} */}
    </Drawer>

    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      className="block lg:hidden"
    >
      <MenuIcon />
    </IconButton>
  </>

}