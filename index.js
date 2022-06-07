#!/usr/bin/env node

`use strict` ;

const projects = [ `hangman-game` , `meditation-app` , `typing-game` ] ;

const slides = document . querySelector ( `#slides-container` ) ;

let animation_ID ;

let current_index = 0 ;

let current_translate = 0 ;

let dragging = false ;

let previous_translate = 0 ;

let start_position = 0 ;

const animation = ( () =>
	{
		slides . style . transform = `translateX(${ current_translate }px)` ;
		( dragging ) ? ( requestAnimationFrame ( animation ) ) : ( `` ) ;
		return ;
	}
) ;

const display = ( () =>
	{
		projects . forEach ( ( project ) =>
			{
				slides . innerHTML += `<div class="slide" id="slide"><a href="./${ project }/index.html" class="link" id="link"><img src="./storage/screenshots/${ project }.png" class="screenshot" id="screenshot" /></a></div>` ;
				return ;
			}
		) ;
		slides . querySelectorAll ( `#slide` ) . forEach ( ( slide , slide_index ) =>
			{
				slide . querySelector ( `#link` ) . addEventListener ( `dragstart` , prevent ) ;
				slide . querySelector ( `#screenshot` ) . addEventListener ( `dragstart` , prevent ) ;
				slide . addEventListener ( `mousedown` , start ( slide_index ) ) ;
				slide . addEventListener ( `mousemove` , move ) ;
				slide . addEventListener ( `mouseup` , end ) ;
				slide . addEventListener ( `mouseleave` , end ) ;
				slide . addEventListener ( `touchstart` , start ( slide_index ) ) ;
				slide . addEventListener ( `touchmove` , move ) ;
				slide . addEventListener ( `touchend` , end ) ;
				slide . addEventListener ( `touchleave` , end ) ;
				return ;
			}
		) ;
		return ;
	}
) ;

const end = ( () =>
	{
		cancelAnimationFrame ( animation_ID ) ;
		dragging = false ;
		let translation = current_translate - previous_translate ;
		( ( translation < - 100 ) && ( current_index < ( ( projects . length ) - 1 ) ) ) ? ( current_index ++ ) : ( `` ) ;
		( ( translation > 100 ) && ( current_index > 0 ) ) ? ( current_index -- ) : ( `` ) ;
		position () ;
		slides . classList . remove ( `grabbing` ) ;
		return ;
	}
) ;

const move = ( ( event ) =>
	{
		if ( dragging )
		{
			let current_position = ( event . type . includes ( `mouse` ) ) ? ( event . pageX ) : ( event . touches [ 0 ] . clientX ) ;
			current_translate = ( previous_translate + current_position ) - start_position ;
			return ;
		}
		return ;
	}
) ;

const position = ( () =>
	{
		current_translate = current_index * ( - window . innerWidth ) ;
		previous_translate = current_translate ;
		slides . style . transform = `translateX(${ current_translate }px)` ;
		return ;
	}
) ;

const prevent = ( ( event ) =>
	{
		event . preventDefault () ;
		event . stopPropagation () ;
		return ;
	}
) ;

const start = ( ( slide_index ) =>
	{
		return ( ( event ) =>
			{
				current_index = slide_index ;
				start_position = ( event . type . includes ( `mouse` ) ) ? ( event . pageX ) : ( event . touches [ 0 ] . clientX ) ;
				dragging = true ;
				animation_ID = requestAnimationFrame ( animation ) ;
				slides . classList . add ( `grabbing` ) ;
				return ;
			}
		) ;
	}
) ;

window . addEventListener ( `resize` , position ) ;

display () ;
