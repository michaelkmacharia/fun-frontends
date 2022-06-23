#!/usr/bin/env node

`use strict` ;

const animation_toggler = document .querySelector ( `#animation-toggler` ) ;

const breathe_phase = 5000 ;

const informational_text = document .querySelector ( `#informational-text` ) ;

const master_container = document . querySelector ( `#master-container` ) ;

const pointer_container = document .querySelector ( `#pointer-container` ) ;

const total_breathe = 15000 ;

let animation_interval , start_time , stop_time ;

const animate = ( () =>
	{
		start_time = new Date () . getTime () ;
		informational_text . className = `` ;
		informational_text . innerText = `Breath in...` ;
		master_container . className = `master-container grow` ;
		pointer_container . className = `pointer-container rotate` ;
		setTimeout ( () =>
			{
				informational_text . innerText = `Hold...` ;
				setTimeout ( () =>
					{
						informational_text . innerText = `Let go...` ;
						master_container . className = `master-container shrink` ;
						return ;
					} ,
				breathe_phase ) ;
				return ;
			} ,
		breathe_phase ) ;
		return ;
	}
) ;

const process = ( ( event ) =>
	{
		switch ( event . target . innerText )
		{
			case ( `Start` ) :
				animation_toggler . innerText = `Stop` ;
				animate () ;
				animation_interval = setInterval ( animate , total_breathe ) ;
				break ;
			default :
				stop_time = new Date () . getTime () ;
				animation_toggler . setAttribute ( `disabled` , `disabled` ) ;
				animation_toggler . innerText = `Stopping...` ;
				setTimeout ( () =>
					{
						animation_toggler . innerText = `Start` ;
						animation_toggler . removeAttribute ( `disabled` ) ;
						pointer_container . className = `pointer-container` ;
						informational_text . innerText = `Meditation App` ;
						informational_text . className = `informational-text` ;
						return ;
					} ,
				( total_breathe - ( stop_time - start_time ) ) ) ;
				clearInterval ( animation_interval ) ;
				break;
		}
		return ;
	}
) ;

animation_toggler . addEventListener ( `mousedown` , process ) ;
