import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// fullName, jerseyNumber, position, gp, goals, assists, points, plusminus, shpct, toipergm
function createData( fullName, jerseyNumber, positionAbbv, games, goals, assists, points, plusminus, shotpct, toipergm) {
  return {fullName, jerseyNumber, positionAbbv, games, goals, assists, points, plusminus, shotpct, toipergm};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
// fullName, jerseyNumber, position, gp, goals, assists, points, plusminus, shpct, toipergm
const headCells = [
  { id: "fullName", numeric: false, disablePadding: false, label: "Name" },
  { id: "jerseyNumber", numeric: true, disablePadding: false, label: "Jersey Number"},
  { id: "position", numeric: true, disablePadding: false, label: "Position" },
  { id: "gp", numeric: true, disablePadding: false, label: "GP" },
  { id: "goals", numeric: true, disablePadding: false, label: "G" },
  { id: "assists", numeric: true, disablePadding: false, label: "A" },
  { id: "points", numeric: true, disablePadding: false, label: "TP" },
  { id: "plusminus", numeric: true, disablePadding: false, label: "+/-" },
  { id: "shotpct", numeric: true, disablePadding: false, label: "Sh %" },
  { id: "toipergm", numeric: true, disablePadding: false, label: "TOI/Gm" }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: "0",
    paddingRight: "0"
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    // flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {props.title}
          </Typography>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: "0",
    marginBottom: "2em"
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function SkaterTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("points");
  const [selected, setSelected] = React.useState([]);
  const page = 0;
  const dense = true;
  const rowsPerPage = 1;
  let rows = [];


  console.log(props);
  // fullName, jerseyNumber, position, gp, goals, assists, points, plusminus, shpct, toipergm
  props.players.forEach(player => {
    rows.push(
      createData(
        player.fullName,
        player.jerseyNumber,
        player.positionAbbv,
        player.statline[0].games,
        player.statline[0].goals,
        player.statline[0].assists,
        player.statline[0].points,
        player.statline[0].plusMinus,
        player.statline[0].shotPct,
        player.statline[0].toiPerGm,
      )
    );
  });

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <EnhancedTableToolbar numSelected={selected.length} title={props.title} />
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getSorting(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                >
                  {/* fullName, jerseyNumber, position, gp, goals, assists, points, plusminus, shpct, toipergm */}
                  <TableCell component="th" id={labelId} scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell align="center">{row.jerseyNumber}</TableCell>
                  <TableCell align="center">{row.positionAbbv}</TableCell>
                  <TableCell align="center">{row.games}</TableCell>
                  <TableCell align="center">{row.goals}</TableCell>
                  <TableCell align="center">{row.assists}</TableCell>
                  <TableCell align="center">{row.points}</TableCell>
                  <TableCell align="center">{row.plusminus}</TableCell>
                  <TableCell align="center">{row.shotpct}%</TableCell>
                  <TableCell align="center">{row.toipergm}</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
