
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        location: null,
        icon: null,
        temp: null,
        desc: null,
        tempToggle: true
      };
      // binding this
      this.handleClick = this.handleClick.bind(this);
      this.getWeather = this.getWeather.bind(this);
      this.onError = this.onError.bind(this);
    }
  
    getWeather(position) {
      // handle undefined coordinates
      let safelat = position.coords.latitude ? position.coords.latitude : 0;
      let safelon = position.coords.longitude ? position.coords.longitude : 0;
     fetch(
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
          safelat +
          "&lon=" +
          safelon
      )
        .then(response => response.json())
        .catch(error => console.error("Error:", error))
        .then(data => {
          this.setState({
            location: data.name + ", " + data.sys.country,
            icon: data.weather[0].icon,
            temp: data.main.temp,
            desc: data.weather[0].description
          });
        });
    }
  
    onError(e) {
      console.error(e);
    }
  
    handleClick(e) {
      e.preventDefault();
      this.setState(prevState => ({
        tempToggle: !prevState.tempToggle
      }));
    }
  
    componentDidMount() {
      // calls geo api and on success call getWeather to get weather data.
      navigator.geolocation.getCurrentPosition(this.getWeather, this.onError);
    }
  
    render() {
      return (
        <div id="app" className="container text-center">
          <h1>Weather</h1>
          <ChildComponent data={this.state.location} />
          <div id="icon">
            <img alt="icon" src={this.state.icon} />
          </div>
          
          <div id="temperatureC">
            {this.state.temp}
            <span>°C</span>
          </div>
         
           <div id="temperatureF">
            {(this.state.temp * 1.8 + 32).toFixed(2)}
               <span>°F</span>
          </div>
          <ChildComponent data={this.state.desc} />
        </div>
      );
    }
  }
  
  const ChildComponent = props => {
    return <div>{props.data}</div>;
  };
  
  ReactDOM.render(<App />, document.getElementById("root"));
  
