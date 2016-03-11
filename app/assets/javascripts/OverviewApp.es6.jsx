const { $, React, ReactDOM, 
        ReactBootstrap: { Row, Grid, Panel, Button } } = window;

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
    return (
      <div className="panel panel-default">
          <div className="panel-heading">
              <div className="pull-right">
                  <a href="/conferences/${id}"
                     className="btn btn-primary btn-xs">Show</a>
              </div>
              <h3 className="panel-title">{name}</h3>
          </div>
      </div>
    );
  };
  
  const Overview = () => {
    return (<Grid>
              <Row>
                <Header />
                <ConferenceRow id="active-conference" name="wroc_love.rb 2016" />
                <ConferenceRow id="past-conference" name="wroc_love.rb 2015" />
              </Row>
            </Grid>);
  };

  return {
    ui() {
      return <Overview/>;
    }
  };
}

$(() => {
    $("[data-app='Overview']").each(function() {
        const app = OverviewApp();
        ReactDOM.render(app.ui(), this);
    });
});
