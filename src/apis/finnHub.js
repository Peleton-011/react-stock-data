import axios from "axios";

const TOKEN = "ch1pqq1r01qn6tg7bodgch1pqq1r01qn6tg7boe0";

export default axios.create({
	baseURL: "https://finnhub.io/api/v1",
	params: {
		token: TOKEN,
	},
});
