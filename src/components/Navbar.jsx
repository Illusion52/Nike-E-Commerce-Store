import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCart, setCloseCart, selectTotalQTY } from '../app/CartSlice';

const Navbar = () => {
	const [navState, setNavState] = useState(false);
	const dispatch = useDispatch();
	const totalQTY = useSelector(selectTotalQTY);

	const onCartToggle = () => {
		dispatch(setOpenCart({ cartState: true }));
	};

	const offCartToggle = () => {
		dispatch(setCloseCart({ cartState: false }));
	};

	const onNavScroll = () => {
		if (window.scrollY > 30) {
			setNavState(true);
		} else {
			setNavState(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', onNavScroll);

		return () => {
			window.removeEventListener('scroll', onNavScroll);
		};
	}, []);

	return (
		<>
			<header
				className={
					!navState
						? 'absolute top-7 left-0 right-0 opacity-100 z-50 transition-all duration-100 ease-in-out'
						: 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[1000] blur-effect-theme transition-all duration-800 ease-in-out'
				}
			>
				<nav className="flex items-center justify-between nike-container">
					<div className="flex items-center">
						<img
							src={logo}
							alt="logo/img"
							className={`w-16 h-auto ${navState && 'filter brightness-0'}`}
						/>
					</div>
					<ul className="flex items-center justify-center gap-2">
						<li className="grid items-center">
							<MagnifyingGlassIcon
								className={`icon-style ${
									navState && 'text-slate-900 transition-all duration-800'
								}`}
							/>
						</li>
						<li className="grid items-center">
							<HeartIcon
								className={`icon-style ${
									navState && 'text-slate-900 transition-all duration-800'
								}`}
							/>
						</li>
						<li className="grid items-center">
							<button
								onClick={onCartToggle}
								type="button"
								className="border-none outline-none active:scale-110 transition-all duration-300 relative"
							>
								<ShoppingBagIcon
									className={`icon-style ${
										navState && 'text-slate-900 transition-all duration-800'
									}`}
								/>
								<div
									className={`absolute top-4 right-0 shadow
                                     w-4 h-4 text-[0.6rem] leading-tight font-medium
                                    rounded-full flex items-center justify-center cursor-pointer hover:scale-110
                                    transition-all duration-300 ${
																			navState
																				? 'bg-slate-900 text-slate-100 shadow-slate-900'
																				: 'bg-slate-100 text-slate-900 shadow-slate-100'
																		}`}
								>
									{totalQTY}
								</div>
							</button>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
