import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";

function OpenTaskModal({open, onClose}){
    return (
        <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography fontWeight={600}>
            Aufgabe
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Typography mb={2}>
            Bitte wähle einen Mitarbeiter aus, für den ein Stundenzettel
            erstellt werden soll:
          </Typography>

          <TextField
            select
            label="Mitarbeiter"
            value={activeCoWorker}
            onChange={(e) => setActiveCoWorker(e.target.value)}
            fullWidth
            required
            error={!activeCoWorker}
            helperText={
              !activeCoWorker ? "Bitte einen Mitarbeiter auswählen" : ""
            }
          >
            {coWorkerData.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setOpenTimeSheet(true);
              onClose();
            }}
            disabled={!activeCoWorker}
          >
            Weiter
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default OpenTaskModal;