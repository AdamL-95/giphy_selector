import { Alert, Snackbar } from "@mui/material"

const CopiedAlert: React.FC<{ open: boolean; handleClose: any }> = ({
  open,
  handleClose,
}) => {
  return (
    <>
      <Snackbar open={open} autoHideDuration={1100} onClose={handleClose}>
        <Alert severity="success">Link copied to clipboard</Alert>
      </Snackbar>
    </>
  )
}

export default CopiedAlert
