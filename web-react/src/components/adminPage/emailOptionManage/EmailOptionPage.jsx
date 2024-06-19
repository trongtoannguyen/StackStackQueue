import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

import { Button, Col, Row, Card, ListGroup } from "react-bootstrap";

import {
	getEmailOptionById,
	putUpdateEmailOption,
} from "../../../services/emailService/EmailOptionService";
import { createAxios } from "../../../services/createInstance";
import { loginSuccess } from "../../../redux/authSlice";

const EmailOption = () => {
	const [emailOption, setEmailOption] = useState({});

	const [host, setHost] = useState(0);
	const [port, setPort] = useState(0);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [tlsEnable, setTlsEnable] = useState(true);
	const [authentication, setAuthentication] = useState(true);

	const [show, setShow] = useState(false);
	// const [showTest, setShowTest] = useState(false);

	let currentUser = useSelector((state) => state.auth.login?.currentUser);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

	const getEmailOption = async () => {
		const accessToken = currentUser?.accessToken;
		let res = await getEmailOptionById(accessToken, axiosJWT);
		if (+res.status === 200) {
			setEmailOption(res?.data?.data);
			const { host, port, username, password, tlsEnable, authentication } =
				res.data.data;
			setHost(host);
			setPort(port);
			setUsername(username);
			setPassword(password);
			setTlsEnable(tlsEnable);
			setAuthentication(authentication);
		} else {
			console.log(`Error: `, res?.data?.message);
			navigate("/login");
		}

		return true;
	};

	const handleUpdateEmailOption = async () => {
		console.log(`Check`);

		const emailOption = {
			host: host,
			port: port,
			username: username,
			password: password,
			tlsEnable: tlsEnable,
			authentication: authentication,
		};
		const accessToken = currentUser?.accessToken;
		let res = await putUpdateEmailOption(emailOption, accessToken, axiosJWT);
		console.log(`Check res`, res.data);
		if (+res.status === 200) {
			setEmailOption(res.data);
			toast.success(res?.message);
		} else {
			console.log(`Error: `, res?.data?.message);
		}
	};

	const toolbarOptions = [
		["bold", "italic", "underline", "strike"], // toggled buttons
		["blockquote", "code-block"],
		["link", "image", "video", "formula"],

		[{ header: 1 }, { header: 2 }], // custom button values
		[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
		[{ script: "sub" }, { script: "super" }], // superscript/subscript
		[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
		[{ direction: "rtl" }], // text direction

		[{ size: ["small", false, "large", "huge"] }], // custom dropdown
		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[{ font: [] }],
		[{ align: [] }],

		["clean"], // remove formatting button
	];

	const module = {
		toolbar: toolbarOptions,
	};

	//Text Mail
	const [fromData, setFromData] = useState("");
	const [toData, setToData] = useState("");
	const [message, setMessage] = useState("");

	const handleSendEmail = () => {
		console.log(`Send Email`);
		console.log(`From: ${fromData}`);
		console.log(`To: ${toData}`);
		console.log(`Message: ${message}`);
	};

	useEffect(() => {
		if (!currentUser.accessToken) {
			createAxios(currentUser, dispatch, loginSuccess);
		}
		getEmailOption();
	}, []);

	return (
		<div className="content">
			<h3>Email Option Manage</h3>
			<Col>
				<p></p>
				{emailOption != null ? (
					<ListGroup as="ol" numbered>
						<ListGroup.Item as="li">Host: {emailOption?.host}</ListGroup.Item>
						<ListGroup.Item as="li">Port: {emailOption?.port}</ListGroup.Item>
						<ListGroup.Item as="li">
							Username: {emailOption?.username}
						</ListGroup.Item>
					</ListGroup>
				) : (
					<div className="text-center">
						<span className="d-flex justify-content-center">
							<i className="fas fa-sync fa-spin fa-5x"></i>
							<br />
						</span>
						<h5>Loading...</h5>
					</div>
				)}

				{!show && (
					<Row className="d-flex justify-content-end">
						<Button
							className="col-md-2 me-3"
							variant="secondary"
							onClick={() => setShow(!show)}
						>
							{show ? "Close" : "Update"}
						</Button>
					</Row>
				)}

				{show && (
					<Card className="my-3">
						<h5 className="text-center m-3">Update Email Option</h5>
						<Row className="p-3">
							<div className="form-group mb-3 col-md-6">
								<label htmlFor="host">
									Host of email: <span className="text-danger">(*)</span>
								</label>
								<input
									value={host}
									name="host"
									className="form-control"
									required
									onChange={(e) => setHost(e.target.value)}
								/>
							</div>
							<div className="form-group mb-3 col-md-6">
								<label htmlFor="port">
									Port of port: <span className="text-danger">(*)</span>
								</label>
								<input
									value={port}
									name="port"
									className="form-control"
									required
									onChange={(e) => setPort(e.target.value)}
								/>
							</div>
						</Row>
						<Row className="p-3">
							<div className="form-group mb-3 col-md-6">
								<label htmlFor="username">
									Username of Email <span className="text-danger">(*)</span>
								</label>
								<input
									value={username}
									name="username"
									className="form-control"
									required
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="form-group mb-3 col-md-6">
								<label htmlFor="password">
									Password of email <span className="text-danger">(*)</span>
								</label>
								<input
									type="password"
									value={password}
									name="password"
									className="form-control"
									required
									onChange={(e) => setHost(e.target.value)}
								/>
							</div>
						</Row>
						<Row className="d-flex justify-content-end">
							<button
								className="btn btn-secondary col-3 me-5"
								onClick={() => setShow(false)}
							>
								Cancel
							</button>
							<Button className="col-3 me-5" onClick={handleUpdateEmailOption}>
								Update
							</Button>
						</Row>
					</Card>
				)}
			</Col>
			<Col>
				<Card>
					<Card.Header>
						<Card.Title as="h5">Text Email Option</Card.Title>
					</Card.Header>
					<Card.Body>
						<div className="row mb-3">
							<div className="col-12 col-lg-6 col-md-6 fw-bold">
								<label className="ms-2 me-auto form-label">From :</label>
								<input
									type="text"
									className="form-control me-2"
									placeholder="Enter from here ...."
									onChange={(e) => setFromData(e.target.value)}
								/>
							</div>
							<div className="col-12 col-lg-6 col-md-6  fw-bold">
								<label className="ms-2 me-auto form-label">To :</label>
								<input
									type="text"
									placeholder="Enter to here ...."
									className="form-control me-2"
									onChange={(e) => setToData(e.target.value)}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<label className="ms-2 me-auto label-control">Message :</label>
								<ReactQuill
									theme="snow"
									modules={module}
									value={message}
									onChange={(value) => setMessage(value)}
									id="message"
									placeholder="Enter message here ...."
									className="content-editor"
								/>
							</div>
						</div>
						<div className="d-flex justify-content-end">
							<button
								className="col-md-2 me-3 btn btn-group-vertical align-items-center"
								onClick={handleSendEmail}
							>
								Send
							</button>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</div>
	);
};

export default EmailOption;
