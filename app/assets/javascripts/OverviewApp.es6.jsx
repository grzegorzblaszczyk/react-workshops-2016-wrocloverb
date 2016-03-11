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
