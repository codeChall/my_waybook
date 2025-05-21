/**
 * Обёртка, чтобы ts понимал, как обрабатывать vue-файлы.
 */
declare module '*.vue' {
	import type {DefineComponent} from 'vue';
	const componentVue: DefineComponent<{}, {}, any>;
	export default componentVue;
}
