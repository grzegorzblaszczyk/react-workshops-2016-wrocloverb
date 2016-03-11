const { $, React, ReactDOM, Redux, ReactRedux,
        ReactBootstrap: { Row, Grid, Button } } = window;

function OverviewApp() {
  const Header = () => {
    return (<h1>
              <div className="pull-right">
                <p><Button href="/conferences" bsStyle="primary">Detailed View</Button></p>
              </div>
              Conferences
            </h1>);
  };

  const ConferenceRow = ({id, name}) => {
    const contents = (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="pull-right">
            <Button bsStyle="primary"
                    bsSize="xs"
                    href="/conferences/${id}">Show</Button>
          </div>
          <h3 className="panel-title">{name}</h3>
        </div>
      </div>
    );
    return contents;
  };
  
  const Overview = ({conferences}) => {
    return (<Grid>
              <Row>
                <Header />
                {conferences.map(({id, key, name}) => {
                  return <ConferenceRow id={id} key={key} name={name} />;
                })}
              </Row>
            </Grid>);
  };

  const initialState = () => {
    return [
      { id: UUID.create().toString(),   key: "wroc_love.rb-2016", name: "wroc_love.rb 2016" },
      { id: UUID.create().toString(),   key: "wroc_love.rb-2015", name: "wroc_love.rb 2015" }
    ];
  };

  // Reducer
  const update = (state=initialState(), action) => {
    return state;
  };

  //Store
  let store = Redux.createStore(update, initialState());

  const stateMapper = (state) => { 
    return { conferences: state };
  };

  const dispatchMapper = (dispatch) => { return {}; };

  const connector = ReactRedux.connect(stateMapper, dispatchMapper);

  const ConnectedOverview = connector(Overview);

  return {
    ui() {
      return <ReactRedux.Provider store={store}>
                <ConnectedOverview />
              </ReactRedux.Provider>;
    }
  };
}

$(() => {
    $("[data-app='Overview']").each(function() {
        const app = OverviewApp();
        ReactDOM.render(app.ui(), this);
    });
});
