import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const useStyles = makeStyles( theme =>({
  root:{
    padding:5,
    maxHeight: '4em',
  },
  card: {
    minWidth: 200,
    maxWidth: 800,
    height: '10em',
    margin: '1em auto',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  pos: {
    marginBottom: 24,
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  ];

export default function ScheduleMonth({games, month, team}) {
    const classes = useStyles();
    const makeMonth = month =>{
        switch(month){
            case 0:
                return "January"
            case 1:
                return "February"
            case 2:
                return "March"
            case 3:
                return "April"
            case 4:
                return "May"
            case 5: 
                return "June"
            case 6:
                return "July"
            case 7:
                return "August"
            case 8:
                return "September"
            case 9:
                return "October"
            case 10:
                return "November"
            case 11:
                return "December"
            default:
                return "Error"
        }
    }
    if (month === 4 | month === 5 | month === 6 | month === 7 | month === 8){
        return null
    }
    const countGamesbyStatus = (status)=>{
        const count = games.filter(game=>{
            if (game.homeTeam.name === team && game.homeTeamStatus === status){
                return 1
            } 
            if (game.awayTeam.name === team && game.awayTeamStatus === status){
                return 1
            }
            else{
                return null
            }
        })
        return count.length
    }
    return (
        <Card className={classes.card}>
        <CssBaseline />
        <CardContent className={classes.root}>
            <h3>{makeMonth(month)}</h3>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Total Games</TableCell>
              <TableCell align="center">Well Rested Games</TableCell>
              <TableCell align="center">Rested Games</TableCell>
              <TableCell align="center">Tired Games</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" align="center">
                  {games.length}
                </TableCell>
                <TableCell align="center">{countGamesbyStatus(3)}</TableCell>
                <TableCell align="center">{countGamesbyStatus(2)}</TableCell>
                <TableCell align="center">{countGamesbyStatus(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </CardContent>
        </Card>
    );
    }