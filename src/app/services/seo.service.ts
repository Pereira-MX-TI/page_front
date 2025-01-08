import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class SeoService {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private title: Title,
        private meta: Meta
    ) {}

    /**
     * Función para colocar el título de la página.
     * @param {string} title - El título que se asignará a la página.
     */
    setTitle(title: string) {
        this.title.setTitle(title);
    }

    /**
     * Función para colocar la descripción de la página.
     * @param {string} description - La descripción que se asociará a la página.
     */
    setDescription(description: string) {
        this.meta.updateTag({ name: 'description', content: description });
    }

    /**
     * Función para colocar la imagen de la página.
     * @param {string} imageUrl - La URL de la imagen que se utilizará cómo imagen principal de la página.
     */
    setImage(imageUrl: string) {
        this.meta.updateTag({ property: 'og:image', content: imageUrl });
    }

    /**
     * Función para colocar una mejor URL en la barra de navegación.
     * @param {string} [url] - La URL canónica de la página (opcional). Si no se proporciona, se utiliza la URL actual del documento.
     */
    setCanonicalURL(url?: string) {
        const canURL = url === undefined ? this.document.URL : url;
        const head = this.document.getElementsByTagName('head')[0];

        let element: HTMLLinkElement | null = this.document.querySelector(
            `link[rel='canonical']`
        );

        if (!element) {
            element = this.document.createElement('link') as HTMLLinkElement;
            head.appendChild(element);
        }

        element.setAttribute('rel', 'canonical');
        element.setAttribute('href', canURL);

        this.setOgUrl(canURL);
    }

    /**
     * Función para indicarle si debe indexar o no la página y si sigue los enlaces.
     * @param {boolean} [state=true] - Indica si la página debe ser indexada y si se deben seguir los enlaces presentes en ella. Por defecto, el estado es true (indexar y seguir los enlaces).
     */
    setIndexingFollower(state: boolean = true) {
        this.meta.updateTag({
            name: 'robots',
            content: state ? 'index, follow' : 'noindex, nofollow',
        });
    }

    setOgTitle(res: string) {
        this.meta.updateTag({ property: 'og:title', content: res });
    }

    setOgUrl(res: string) {
        this.meta.updateTag({ property: 'og:url', content: res });
    }

    setOgDescription(res: string) {
        this.meta.updateTag({ property: 'og:description', content: res });
    }
}
