import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupButton(btn, curPage) {
    return `
        <button data-goto="${
          btn === 'next' ? curPage + 1 : curPage - 1
        }" class="btn--inline pagination__btn--${
      btn === 'next' ? 'next' : 'prev'
    }">
          <span>Page ${btn === 'next' ? curPage + 1 : curPage - 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
      btn === 'next' ? 'right' : 'left'
    }"></use>
          </svg>
        </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      // return `
      //   <button class="btn--inline pagination__btn--next">
      //     <span>Page ${curPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>`;
      return this._generateMarkupButton('next', curPage);
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      // return `
      //   <button class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${curPage - 1}</span>
      //   </button>`;
      return this._generateMarkupButton('prev', curPage);
    }
    // other page
    if (curPage < numPages) {
      // return `
      //   <button class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${curPage - 1}</span>
      //   </button>
      //   <button class="btn--inline pagination__btn--next">
      //     <span>Page ${curPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>`;
      let btnStr = '';
      const btns = [
        this._generateMarkupButton('prev', curPage),
        this._generateMarkupButton('next', curPage),
      ];
      btns.forEach(btn => {
        btnStr += btn;
      });
      return btnStr;
    }
    // page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
