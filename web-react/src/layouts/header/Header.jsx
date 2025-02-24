import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../services/createInstance";
import { logOutSuccess } from "../../redux/authSlice";
import { fetchImage } from "../../services/userService/UserService";

import {
	Collapse,
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Container,
} from "reactstrap";

import avatar from "../../assets/img/default-avatar.png";
import Avatar from "../../components/avatar/Avatar";

import routes from "../../routes/routesForAdmin";
import SearchFormHeader from "../../components/search/SearchFormHeader";

function Header() {
	let currentUser = useSelector((state) => state.auth.login?.currentUser);
	const accessToken = currentUser?.accessToken;
	const id = currentUser?.id;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let avatarUser = useSelector((state) => state.avatar?.avatar?.name);

	const handleLogout = () => {
		let axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);
		logOut(dispatch, id, navigate, accessToken, axiosJWT);
	};
	const [isOpen, setIsOpen] = React.useState(false);
	const [dropdownOpen, setDropdownOpen] = React.useState(false);

	const [dropdownOpenAccount, setDropdownOpenAccount] = React.useState(false);

	const [color, setColor] = React.useState("transparent");
	const sidebarToggle = React.useRef();
	const location = useLocation();

	const toggle = () => {
		if (isOpen) {
			setColor("transparent");
		} else {
			setColor("dark");
		}
		setIsOpen(!isOpen);
	};

	const dropdownToggle = (e) => {
		e.preventDefault();
		setDropdownOpen(!dropdownOpen);
	};

	const dropdownToggleAccount = (e) => {
		e.preventDefault();
		setDropdownOpenAccount(!dropdownOpenAccount);
	};

	const getBrand = () => {
		let brandName = "Tech Forum";
		routes.map((prop) => {
			if (window.location.href.indexOf(prop?.layout + prop?.path) !== -1) {
				brandName = prop.name;
			}
			return null;
		});
		return brandName;
	};

	const openSidebar = () => {
		document.documentElement.classList.toggle("nav-open");
		sidebarToggle.current.classList.toggle("toggled");
	};

	// function that adds color dark/transparent to the navbar on resize (this is for the collapse)
	const updateColor = () => {
		if (window.innerWidth < 993 && isOpen) {
			setColor("dark");
		} else {
			setColor("transparent");
		}
	};

	const handleProfile = () => {
		let url = `/member-profile/${currentUser?.username}`;
		navigate(url);
	};

	const handleRedirectToChangePassword = () => {
		let url = `/change-password/${currentUser?.username}`;
		navigate(url);
	};

	function getNavbarClassName() {
		if (location.pathname.indexOf("full-screen-maps") !== -1) {
			return "navbar-absolute fixed-top";
		} else if (color === "transparent") {
			return "navbar-transparent";
		} else {
			return "";
		}
	}

	function getAvatar() {
		if (avatarUser && avatarUser !== null) {
			return fetchImage(avatarUser);
		}
		if (currentUser?.imageUrl) {
			return currentUser.imageUrl;
		}
		if (currentUser?.avatar) {
			return fetchImage(currentUser.avatar);
		}
		return avatar;
	}

	React.useEffect(() => {
		window.addEventListener("resize", updateColor.bind(this));
	});
	React.useEffect(() => {
		if (
			window.innerWidth < 993 &&
			document.documentElement.className.indexOf("nav-open") !== -1
		) {
			document.documentElement.classList.toggle("nav-open");
			sidebarToggle.current.classList.toggle("toggled");
		}
	}, [location]);

	return (
		// add or remove classes depending if we are on full-screen-maps page or not
		<Navbar
			color={
				location.pathname.indexOf("full-screen-maps") !== -1 ? "dark" : color
			}
			expand="lg"
			className={getNavbarClassName()}
		>
			<Container fluid>
				<div className="navbar-wrapper mx-3">
					<div className="navbar-toggle">
						<button
							type="button"
							ref={sidebarToggle}
							className="navbar-toggler"
							onClick={() => openSidebar()}
						>
							<span className="navbar-toggler-bar bar1" />
							<span className="navbar-toggler-bar bar2" />
							<span className="navbar-toggler-bar bar3" />
						</button>
					</div>
					<NavbarBrand href="#">{getBrand()}</NavbarBrand>
				</div>

				<SearchFormHeader color={color} />

				<div className="navbar-toggler" onClick={toggle}>
					<span className="navbar-toggler-bar navbar-kebab" />
					<span className="navbar-toggler-bar navbar-kebab" />
					<span className="navbar-toggler-bar navbar-kebab" />
				</div>
				<Collapse
					isOpen={isOpen}
					navbar
					className="justify-content-end me-lg-5 align-items-center"
				>
					<Nav navbar>
						<NavItem>
							<Link to="/admin" className="nav-link btn-magnify">
								<i className="fa-solid fa-chart-simple fa-xl d-lg-inline-block d-none"></i>
								<p>
									<span className="d-lg-none d-md-block">Stats Dashboard</span>
								</p>
							</Link>
						</NavItem>
						{/*<Dropdown*/}
						<Dropdown
							nav
							isOpen={dropdownOpen}
							toggle={(e) => dropdownToggle(e)}
						>
							<DropdownToggle caret nav>
								<i className="fa-regular fa-bell fa-xl d-lg-inline-block d-none"></i>
								<p>
									<span className="d-lg-none d-md-block">Notification</span>
								</p>
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem tag="a">Action 1</DropdownItem>
								<DropdownItem tag="a">Action 2</DropdownItem>
								<DropdownItem tag="a">Action 3</DropdownItem>
							</DropdownMenu>
						</Dropdown>
						{/*</Dropdown>*/}

						{currentUser?.username != null ? (
							<Dropdown
								nav
								isOpen={dropdownOpenAccount}
								toggle={(e) => dropdownToggleAccount(e)}
							>
								<DropdownToggle caret nav>
									<Avatar src={getAvatar()} height={25} width={25} />
									<p>
										<span className="d-lg-none d-md-block text-three-dot">
											{currentUser?.name ?? currentUser?.username}
										</span>
									</p>
								</DropdownToggle>
								<DropdownMenu right style={{ width: "clamp(55ch, 50%, 75ch)" }}>
									<DropdownItem header className="d-lg-inline-block d-none">
										{currentUser.username}
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem tag="a" onClick={() => handleProfile()}>
										<i className="fa-solid fa-user fa-xl d-inline-block d-none"></i>
										<p>
											<span className="d-block">My profile</span>
										</p>
									</DropdownItem>
									<DropdownItem
										tag="a"
										onClick={handleRedirectToChangePassword}
									>
										<i className="fa-solid fa-key fa-xl d-inline-block d-none"></i>
										<p>
											<span className="d-block">Change password</span>
										</p>
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem tag="a" onClick={() => handleLogout()}>
										<i className="fa-solid fa-right-from-bracket fa-xl d-inline-block d-none"></i>
										<p>
											<span className="d-block">Logout</span>
										</p>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						) : (
							<>
								<NavItem>
									<Link to="/login" className="nav-link btn-rotate">
										<i className="fa-solid fa-right-to-bracket fa-xl d-lg-inline-block d-none"></i>
										<p>
											<span className="d-lg-none d-md-block">Sign in</span>
										</p>
									</Link>
								</NavItem>
								<NavItem>
									<Link to="/register" className="nav-link btn-rotate">
										<i className="fa-solid fa-user-plus fa-xl d-lg-inline-block d-none"></i>
										<p>
											<span className="d-lg-none d-md-block">Sign up</span>
										</p>
									</Link>
								</NavItem>
							</>
						)}
					</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
