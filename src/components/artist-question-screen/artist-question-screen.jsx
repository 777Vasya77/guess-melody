import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '~/components/audio-player/audio-player';

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
  }

  _handlePlayButtonClick() {
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    const {question, screenIndex, onAnswer} = this.props;
    const {isPlaying} = this.state;
    const {answers, song} = question;

    return (
      <section className="game game--artist">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx={390} cy={390} r={370} style={{filter: `url(#blur)`, transform: `scaleY(-1)`, transformOrigin: `center`}} />
          </svg>

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong" />
            <div className="wrong" />
            <div className="wrong" />
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              <AudioPlayer
                isPlaying={isPlaying}
                onPlayButtonClick={this._handlePlayButtonClick}
                src={song.src}
              />
            </div>
          </div>

          <form className="game__artist" onChange={(evt) => {
            onAnswer([JSON.parse(evt.target.value)]);
          }}>
            {answers.map((answer, i) => {
              return (
                <div key={`${screenIndex}-answer-${i}`} className="artist">
                  <input
                    className="artist__input visually-hidden"
                    type="radio"
                    name="answer"
                    value={JSON.stringify(answer)}
                    id={`answer-${i}`}
                  />
                  <label className="artist__name" htmlFor={`answer-${i}`}>
                    <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                    {answer.artist}
                  </label>
                </div>
              );
            })}
          </form>
        </section>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  question: PropTypes.exact({
    type: PropTypes.oneOf([`genre`, `artist`]),
    song: PropTypes.exact({
      artist: PropTypes.string,
      src: PropTypes.string,
    }),
    answers: PropTypes.arrayOf(PropTypes.exact({
      picture: PropTypes.string,
      artist: PropTypes.string,
    }))
  }).isRequired,
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func
};

export default ArtistQuestionScreen;
