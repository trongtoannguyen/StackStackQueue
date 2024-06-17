import PropTypes from "prop-types";
import { useCallback, useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";
import _ from "lodash";
import { Link } from "react-router-dom";

//Services
import {
	searchComment,
	searchForum,
} from "../../services/searchService/SearchService";

const SearchFormHeader = ({ color }) => {
	const [keyword, setKeyword] = useState("");

	const [listSearch, setListSearch] = useState([]);

	const [listForums, setListForums] = useState([]);

	const [listComments, setListComments] = useState([]);

	const handleComment = async (value) => {
		let res = await searchComment(value);
		if (res && +res.data.status === 200) {
			let cloneListComment = _.cloneDeep(listComments);
			cloneListComment = res.data.data;
			setListComments(cloneListComment);
		}
	};

	const handleForum = async (value) => {
		let res = await searchForum(value);
		if (res && +res.data.status === 200) {
			let cloneListForums = _.cloneDeep(listForums);
			cloneListForums = res.data.data;
			setListForums(cloneListForums);
		}
	};

	const handleSearch = (value) => {
		if (value) {
			handleForum(value);
			handleComment(value);
		} else {
			setListSearch([]);
		}
	};

	const debounceFn = useCallback(_debounce(handleSearch, 500), []);

	const handleChange = (event) => {
		const value = event.target.value;
		setKeyword(value);
		debounceFn(value);
	};

	useEffect(() => {
		setListSearch([...listForums, ...listComments]);
	}, [listForums, listComments]);

	return (
		<form className="search-form col-sm-6 h-screen flex items-center justify-center relative">
			<InputGroup className="no-border">
				<Input
					placeholder="Search..."
					className="text-lg rounded-full border-2 border-gray-500 focus:border-gray-900 transition"
					name="search"
					value={keyword}
					onChange={handleChange}
				/>
				<InputGroupAddon addonType="append">
					<InputGroupText
						className={`search-btn ${
							color === "transparent" ? "text-dark" : "bg-light"
						}`}
						onClick={() => handleSearch(keyword)}
					>
						<i className="fa-solid fa-magnifying-glass"></i>
					</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			{listSearch && listSearch.length > 0 && (
				<div className="search-results absolute">
					{listSearch.map((item, index) => (
						<div
							key={index}
							className={`search-result-item ${
								color === "transparent" ? "text-dark" : "bg-light"
							}`}
						>
							<Link
								to={
									item.type === "forum"
										? `/forum/${item.id}`
										: `/discussion/${item.discussionId}`
								}
							>
								{item.title}
							</Link>
						</div>
					))}
				</div>
			)}
		</form>
	);
};

SearchFormHeader.propTypes = {
	color: PropTypes.string.isRequired,
};

export default SearchFormHeader;
