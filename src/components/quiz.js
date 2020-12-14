import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Grid,
  Typography,
  makeStyles,
  CardContent,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import data0 from "../static/data";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#16697a",
    display: "flex",
  },
  card: { width: "60%", margin: "50px auto", backgroundColor: "#f8f1f1" },
  heading: { fontSize: "32px", margin: "auto" },
  startButton: { margin: "auto" },
  stepper: {
    width: "60%",
    margin: "auto",
    backgroundColor: "transparent",
  },
  box: {
    border: "1px solid #16697a",
    width: "80%",
    height: "300px",
    margin: "auto",
  },
  optionNormal: {
    border: "1px solid #3f51b4",
    width: "max-content",
    marginTop: "10px",
    padding: "2px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#3f51b4",
  },
  optionHighlight: {
    border: "1px solid #3f51b4",
    width: "max-content",
    marginTop: "10px",
    padding: "2px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white",
    backgroundColor: "#3f51b4",
  },
  optionWrongHighlight: {
    border: "1px solid #ec524b",
    width: "max-content",
    marginTop: "10px",
    padding: "2px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white",
    backgroundColor: "#ec524b",
  },
  optionRightNormal: {
    border: "1px solid #5aa469",
    width: "max-content",
    marginTop: "10px",
    padding: "2px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#5aa469",
  },
  optionRightHighlight: {
    border: "1px solid #5aa469",
    width: "max-content",
    marginTop: "10px",
    padding: "2px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white",
    backgroundColor: "#5aa469",
  },
  bottomButtons: {
    margin: "auto",
    width: "80%",
    position: "relative",
    right: "-60px",
    top: "30px",
  },
});

const Quiz = () => {
  const classes = useStyles();
  const [isStarted, setIsStarted] = useState(false);
  const [data, setData] = useState(null);
  const [stepNo, setStepNo] = useState(0);
  const [state, setState] = useState([null, null, null, null, null]);
  const [checkState, setCheckState] = useState(false);

  function getRandom(min, max, n) {
    const genRandom = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);
    let arr = [];
    while (arr.length < n) {
      let random = genRandom(min, max);
      if (!arr.find((u) => u === random)) arr.push(random);
    }
    return arr;
  }

  useEffect(() => {
    let randomArr = getRandom(0, 10, 5);
    let temp = [];
    randomArr.forEach((u) => temp.push(data0[u]));
    setData(temp);
  }, []);

  const getOptionClass = (checked, index, questionNo) => {
    if (!checkState) {
      if (checked === index) return classes.optionHighlight;
      return classes.optionNormal;
    }
    if (data[questionNo].correct === checked && checked === index) {
      return classes.optionRightHighlight;
    }
    if (data[questionNo].correct === index) return classes.optionRightHighlight;
    if (checked === index) return classes.optionWrongHighlight;
    return classes.optionNormal;
  };

  const getScore = () => {
    let count = 0;
    for (let i = 0; i < 5; i++) if (state[i] === data[i].correct) count++;
    return count;
  };

  return (
    <>
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item style={{ display: "flex" }}>
                <Typography className={classes.heading}>Python Quiz</Typography>
              </Grid>

              {isStarted ? (
                <>
                  {stepNo === 5 ? (
                    <>
                      <div style={{ display: "flex" }}>
                        <h1 style={{ margin: "auto", marginTop: "140px" }}>
                          Score: {getScore()}
                        </h1>
                      </div>
                    </>
                  ) : (
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ display: "flex", marginTop: "40px" }}
                    >
                      <Stepper
                        activeStep={stepNo}
                        alternativeLabel
                        className={classes.stepper}
                      >
                        {data.map((label, i) => (
                          <Step key={i}>
                            <StepLabel></StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      <div className={classes.box}>
                        <div style={{ margin: "20px" }}>
                          <Typography style={{ fontSize: "20px" }}>
                            {data[stepNo].question}
                          </Typography>
                          <div style={{ marginTop: "20px" }}>
                            {data[stepNo].options.map((u, i) => (
                              <>
                                <Typography
                                  className={getOptionClass(
                                    state[stepNo],
                                    i,
                                    stepNo
                                  )}
                                  onClick={() => {
                                    let temp = [...state];
                                    temp[stepNo] = i;
                                    setState(temp);
                                  }}
                                >
                                  {i + 1}. {u}
                                </Typography>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        className={classes.bottomButtons}
                      >
                        <Grid item xs={4}>
                          <Button
                            onClick={() => {
                              if (stepNo !== 0) setStepNo(stepNo - 1);
                              setCheckState(false);
                            }}
                          >
                            Previous
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            onClick={() => {
                              if (state[stepNo] === null)
                                return window.alert(
                                  "Choose an option to check"
                                );
                              setCheckState(true);
                            }}
                          >
                            check if right
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          {stepNo === 4 ? (
                            <Button
                              onClick={() => {
                                setStepNo(stepNo + 1);
                              }}
                            >
                              Submit
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                setStepNo(stepNo + 1);
                                setCheckState(false);
                              }}
                            >
                              Next
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </>
              ) : (
                <>
                  <Grid item style={{ display: "flex", marginTop: "180px" }}>
                    <Button
                      className={classes.startButton}
                      variant="outlined"
                      color="primary"
                      onClick={() => setIsStarted(true)}
                    >
                      Start the quiz
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Quiz;
