#!/usr/bin/env node

`use strict` ;

const guess = document . querySelector ( `#guess` ) ;

const message = document . querySelector ( `#message` ) ;

const notification = document . querySelector ( `#notification-container` ) ;

const play = document . querySelector ( `#play` ) ;

const popup = document . querySelector ( `#popup-container` ) ;

const reveal = document . querySelector ( `#reveal` ) ;

const right_letters = new Array () ;

const stickman = document . querySelectorAll ( `.stickman-part` ) ;

const wrong = document . querySelector ( `#wrong-letters` ) ;

const wrong_letters = new Array () ;

let fillable = true ;

let word = words [ Math . floor ( Math . random () * words . length ) ] ;

const click = ( () =>
	{
		fillable = true ;
		right_letters . splice ( 0 ) ;
		wrong_letters . splice ( 0 ) ;
		word = words [ Math . floor ( Math . random () * words . length ) ] ;
		display () ;
		update () ;
		popup . style . display = `none` ;
		return ;
	}
) ;

const display = ( () =>
	{
		guess . innerHTML = `${ word . split ( `` ) . map ( ( letter ) =>
			{
				return ( `<span class="letter">${ right_letters . includes ( letter ) ? letter : `` }</span>` ) ;
			}
		) . join ( `` ) }` ;
		const inner_word = guess . innerText . replace ( /[ \n]/g , `` ) ;
		if ( inner_word === word )
		{
			message . innerText = `Nice... 😃 \nYour stickman's safe.\n\nLooks like someone went to college.` ;
			reveal . innerText = `` ;
			popup . style . display = `flex` ;
			fillable = false ;
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
					notify () ;
					return ;
				}
				if ( ! wrong_letters . includes ( letter ) )
				{
					wrong_letters . push ( letter ) ;
					update () ;
					return ;
				}
				notify () ;
				return ;
			}
		}
		return ;
	}
) ;

const notify = ( () =>
	{
		notification . classList . add ( `show` ) ;
		setTimeout ( () =>
			{
				notification . classList . remove ( `show` ) ;
				return ;
			} ,
		3000 ) ;
		return ;
	}
) ;

const update = ( () =>
	{
		wrong . innerHTML = `${ wrong_letters . length > 0 ? `<div>Nope!</div>` : `` } ${ wrong_letters . map ( letter => `<span>${ letter }</span>` ) }` ;
		stickman . forEach ( ( part , index ) =>
			{
				const errors = wrong_letters . length ;
				if ( index < errors )
				{
					part . style . display = `block` ;
					return ;
				}
				part . style . display = `none` ;
				return ;
			}
		) ;
		if ( wrong_letters . length === stickman . length )
		{
			message . innerText = `Ahhh... 😕 \nHe was so young.\n\nThe word was "${ word }".` ;
			popup . style . display = `flex` ;
			fillable = false ;
			return ;
		}
		return ;
	}
) ;

play . addEventListener ( `click` , click ) ;

window . addEventListener ( `keydown` , keydown ) ;

display () ;
