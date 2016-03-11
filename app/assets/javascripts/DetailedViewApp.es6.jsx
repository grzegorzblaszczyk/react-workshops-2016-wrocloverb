const { $, React, ReactDOM, Redux, ReactRedux,
        ReactBootstrap: { Panel, Heading, Row, Col, Grid, Button } } = window;

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

  const DetailedView = ({conference}) => {
    return (<Grid>
              <Row>
                <Header />
              </Row>
              <Row>
                <Col md={6}>
                  <Panel header={eventsTitle}>
                    Panel content
                  </Panel>
                </Col>
                <Col md={6}>
                  <Panel header="Days">
                    Panel content
                  </Panel>
                </Col>

              </Row>
            </Grid>);
  };

  const initialState = () => {
    return { id: "active-conference", key: "wroc_love.rb-2016", name: "wroc_love.rb 2016" };
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
