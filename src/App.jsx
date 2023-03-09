import {useEffect, useState} from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import Card from './components/Card';
import SelectedCard from './components/SelectedCard';

function App() {
	// const env = 'production';
	const [apiData, setApiData] = useState();
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [selectedNftData, setSelectedNftData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(false);
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'fc184dad-9ec0-4b83-85a8-c8fbbaa743c4',
		},
	};
	useEffect(() => {
		if (window.innerWidth > 1000)
			isModalOpened
				? (document.body.style.overflow = 'hidden')
				: (document.body.style.overflow = 'scroll');
	}, [isModalOpened]);

	useEffect(() => {
		fetch(
			'https://api.nftport.xyz/v0/accounts/0xf5663d0eee3620c4a88e28e392aac72d077a8c4d?chain=ethereum&page_size=50&include=metadata',
			options
		)
			.then(response => response.json())
			.then(response => {
				setApiData(response.nfts);
			})
			.catch(err => {
				console.error(err);
				setErrorMessage(err.message);
			})
			.finally(() => setLoading(false));
	}, []);

	const selectedCardFunc = async (contract_address, token_id) => {
		setLoading(true);
		fetch(
			`https://api.nftport.xyz/v0/nfts/${contract_address}/${token_id}?chain=ethereum&refresh_metadata=true`,
			options
		)
			.then(response => response.json())
			.then(response => {
				setSelectedNftData(response);
				setIsModalOpened(true);
				setLoading(true);
			})
			.catch(err => console.error(err))
			.finally(() => setLoading(false));
	};

	return (
		<div className="App">
			<main>
				<h1 className="header-title">NFT Card Gallery</h1>
				{!loading ? (
					errorMessage ? (
						<div className="loader-container">
							<h2>{errorMessage}</h2>
						</div>
					) : (
						<section className="cardsContainer">
							{apiData &&
								apiData.map(data => (
									<Card
										key={uuidv4()}
										data={data}
										selectedCardFunc={selectedCardFunc}
									/>
								))}
						</section>
					)
				) : (
					<div className="loader-container">
						<div className="spinner"></div>
					</div>
				)}
				{isModalOpened && (
					<div className="overlay" onClick={() => setIsModalOpened(false)}>
						<SelectedCard data={selectedNftData} />
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
