const { $, React, ReactDOM, Redux, ReactRedux,
        ReactBootstrap: { 
          Alert,
          Button,
          Col, 
          Grid, 
          Heading, 
          ListGroup,
          ListGroupItem,
          Panel, 
          Row, 
        } 
      } = window;

function DetailedViewApp() {
  const Header = ({conference}) => {
    return (<h1>
              <div className="pull-right">
                <div className="btn-group">
                  <Button href="/" bsStyle="default">Back</Button>
                  <Button href="/" bsStyle="danger">Delete</Button>
                </div>
              </div>
              {conference.name}
            </h1>);
  };
  
  const eventsTitle = (
    <h3>
      <div className="pull-right">
        <Button href="/conferences/active-conference/events" bsStyle="primary" bsSize="xs">Manage</Button>
      </div>
      Events
    </h3>
  );

  const eventsDays = (
    <h3>
      <div className="pull-right">
        <Button href="/conferences/active-conference/conference_days" bsStyle="primary" bsSize="xs">Manage</Button>
      </div>
      Days
    </h3>
  );

  const DetailedView = ({conference}) => {
    return (<Grid>
              <Row>
                <Header conference={conference}/>
              </Row>
              <Row>
                <Col md={6}>
                  <Panel header={eventsTitle}>
                    <ListGroup>
                      {conference.events.map(({name, speaker, description, durationInMinutes, schedule}) => {
                        return (
                          <ListGroupItem key={name}>
                            <h4>
                              {name}
                              <br/>
                              <small>by {speaker}</small>
                            </h4>
                            <h6>Description</h6>
                            <p>
                              {description || <i>no description provided</i>}
                            </p>
                            <p><i>This event takes {durationInMinutes} minutes.</i></p>
                            <Alert bsStyle={(schedule.day == null) ? 'warning' : 'success'}>
                              {(schedule.day == null && schedule.startTime) 
                                ? "This event is scheduled for Day " + schedule.day + " of the conference at " + schedule.startTime
                                : "This event is not scheduled yet!"
                              }
                            </Alert>

                          </ListGroupItem>
                          );
                      })}
                    </ListGroup>
                  </Panel>
                </Col>
                <Col md={6}>
                  <Panel header={eventsDays}>
                    Panel content
                  </Panel>
                </Col>

              </Row>
            </Grid>);
  };

  const initialState = () => {
    return { 
      id: "active-conference", 
      key: "wroc_love.rb-2016", 
      name: "wroc_love.rb 2016",
      events: [
        { 
          name: "Working with Legacy Code",
          speaker: 'Andrzej Krzywda',
          description: "I'll show cool tricks to make your legacy codebase maintainable and make it easy to add new features without introducing regressions.",
          durationInMinutes: 60,
          schedule: {
            day: 1,
            startTime: "18:00"
          }
        },
        { 
          name: "React.js + Redux Workshops",
          speaker: 'Marcin Grzywaczewski',
          description: "",
          durationInMinutes: 310,
          schedule: {
          }          
        }
      ],
      days: [
        {
          key: 'day1',
          dayNumber: 1,
          startTime: '2016-03-11 11:00:00 CET',
          schedule: {
            day: null,
            startTime: null
          }
        }
      ]
    };
  };

  // Reducer
  const update = (state=initialState(), action) => {
    return state;
  };

  //Store
  let store = Redux.createStore(update, initialState());

  const stateMapper = (state) => { 
    return { conference: state };
  };

  const dispatchMapper = (dispatch) => { return {}; };

  const connector = ReactRedux.connect(stateMapper, dispatchMapper);

  const ConnectedDetailedView = connector(DetailedView);

  return {
    ui() {
      return <ReactRedux.Provider store={store}>
                <ConnectedDetailedView />
              </ReactRedux.Provider>;
    }
  };
}

$(() => {
    $("[data-app='DetailedView']").each(function() {
        const app = DetailedViewApp();
        ReactDOM.render(app.ui(), this);
    });
});
