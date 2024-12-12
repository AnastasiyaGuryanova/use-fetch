import { useFetch } from './hooks';
import './App.css';

const HOST = 'https://jsonplaceholder.typicode.com/';

export const App = () => {
	const { data, isLoading, error, refetch } = useFetch(`${HOST}/posts`);

	return (
		<div>
			<div>
				<button
					onClick={() =>
						refetch({
							params: {
								_limit: 5,
							},
						})
					}
				>
					Перезапросить
				</button>
			</div>

			{isLoading && 'Загрузка...'}

			{error && 'Произошла ошибка'}

			{data && !isLoading && data.map((item) => <div key={item.id}>{item.title}</div>)}
		</div>
	);
};
