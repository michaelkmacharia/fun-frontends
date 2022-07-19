#!/usr/bin/env node

`use strict` ;

const game = document . querySelector ( `#game-container` ) ;

const guess = document . querySelector ( `#guess` ) ;

const message = document . querySelector ( `#message` ) ;

const play = document . querySelector ( `#play` ) ;

const popup = document . querySelector ( `#popup-container` ) ;

const right_letters = new Array () ;

const score = document . querySelector ( `#score` ) ;

const time = document . querySelector ( `#time` ) ;

const word_ = document . querySelector ( `#word` ) ;

let countdown_interval ;

let countdown_time = 7 ;

let fillable = true ;

let score_count = 0 ;

let total_time = 0 ;

let word = words [ Math . floor ( Math . random () * words . length ) ] ;

const click = ( () =>
	{
		clearInterval ( countdown_interval ) ;
		fillable = true ;
		right_letters . splice ( 0 ) ;
		word = words [ Math . floor ( Math . random () * words . length ) ] ;
		display () ;
		message . innerText = `` ;
		popup . style . display = `none` ;
		countdown_time = ( countdown_time === 0 ) ? ( 7 ) : ( countdown_time ) ;
		countdown_interval = setInterval ( countdown , 1000 ) ;
		return ;
	}
) ;

const countdown = ( () =>
	{
		total_time ++ ;
		countdown_time -- ;
		time . innerText = countdown_time ;
		if ( countdown_time === 0 )
		{
			clearInterval ( countdown_interval ) ;
			fillable = false ;
			message . innerText = `Game Over!\n\nYour score: ${ score_count } word${ ( score_count === 1 ) ? ( `` ) : ( `s` ) } in ${ total_time } seconds.` ;
			popup . style . display = `flex` ;
			total_time = 0 ;
			score_count = 0 ;
			score . innerText = score_count ;
			return ;
		}
		return ;
	}
) ;

const display = ( () =>
	{
		word_ . innerText = word ;
		guess . innerHTML = `${ word . split ( `` ) . map ( ( letter ) =>
			{
				return ( `<span class="letter">${ right_letters . includes ( letter ) ? letter : `` }</span>` ) ;
			}
		) . join ( `` ) }` ;
		const inner_word = guess . innerText . replace ( /[ \n]/g , `` ) ;
		if ( inner_word === word )
		{
			countdown_time ++ ;
			time . innerText = countdown_time ;
			score_count ++ ;
			score . innerText = score_count ;
			click () ;
			return ;
		}
		return ;
	}
) ;

const keydown = ( ( event ) =>
	{
		if ( fillable )
		{
			if ( event . keyCode == 32 || ( event . keyCode >= 48 && event . keyCode <= 90 ) || event . keyCode == 173 || event . keyCode == 188 || event . keyCode == 190 || event . keyCode == 191 || event . keyCode == 222 )
			{
				const letter = event . key ;
				if ( word . includes ( letter ) )
				{
					if ( ! right_letters . includes ( letter ) )
					{
						right_letters . push ( letter ) ;
						display () ;
						return ;
					}
					return ;
				}
				return ;
			}
			return ;
		}
		return ;
	}
) ;

countdown_interval = setInterval ( countdown , 1000 ) ;

play . addEventListener ( `click` , click ) ;

window . addEventListener ( `keydown` , keydown ) ;

display () ;
