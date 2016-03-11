const { $, React, ReactDOM } = window;

function OverviewApp() {
  const Header = () => {
    return (<h1>
            <div className="pull-right">
              <p><a href="/conferences" className="btn btn-primary">Detailed View</a></p>
            </div>
            Conferences
          </h1>);
  };

  const ConferenceRow = () => {
    return (
      <div className="panel panel-default">
          <div className="panel-heading">
              <div className="pull-right">
                  <a href="/conferences/active-conference"
                     className="btn btn-primary btn-xs">Show</a>
              </div>
              <h3 className="panel-title">wroc_love.rb 2016</h3>
          </div>
      </div>
    );
  };
  
  const Overview = () => {
    return (<div className="container">
              <div className="row">
                <Header />
              </div>
            </div>);
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
