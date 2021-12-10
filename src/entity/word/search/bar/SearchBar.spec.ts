import SearchBar from './SearchBar.svelte';
import { render } from '@testing-library/svelte';

describe('SearchBar Component', () => {
	it('Should create', () => {
		const { container } = render(SearchBar);

		expect(container).toBeTruthy();
	});
});
