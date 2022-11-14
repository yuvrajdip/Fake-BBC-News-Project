/*********  
    Dynamic Menu Bar Starts ********/

const dynamicMenuBar = async () => {
	const url = `https://openapi.programming-hero.com/api/news/categories`;

	try {
		const res = await fetch(url);
		const data = await res.json();

		// console.log(data.data.news_category);
		displayMenuBar(data.data.news_category);
	} catch (error) {
		console.log(error);
	}
};

// displayMenuBar function
const displayMenuBar = (arr) => {
	const menuBarUl = document.getElementById("menu-bar-ul");

	arr.forEach((arr_item) => {
		console.log(arr_item);

		const li = document.createElement("li");
		li.innerHTML = `
            <li class="nav-item">
			    <a onclick="loading_Categorywise_News('${arr_item.category_id}'); spinner();" class="nav-link" href="#">${arr_item.category_name}</a>
			</li>
        `;

		menuBarUl.appendChild(li);
	});
};

dynamicMenuBar();

/******  
        Dynamic Menu Bar Ends ********/



		
/* 
	loading spinner 
*/
const spinner = () =>{
	toggleSpinner(true);
}




/*********  
    Displaying Categorywise News Starts ********/

const loading_Categorywise_News = async (category_id) => {
	// console.log(category_id);

	const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

	// console.log( url );

	try {
		const res = await fetch(url);
		const data = await res.json();

		console.log(data);
		displaying_Categorywise_News(data.data);
	} catch (error) {
		console.log(error);
    
        alert('404 Page Not Found');
	}

	// console.log( data );
};


const displaying_Categorywise_News = (arr) => {

    /* 
        Sorting in descending order done
    */
    arr.sort((a, b) => {
		return b.total_view - a.total_view;
	});
	// console.log( arr );

	const news_card_items = document.getElementById("news-card-items");
	news_card_items.textContent = ``;

	const countNews = document.getElementById("count_news");
	countNews.innerHTML = ``;

	if (arr.length === 0) {
		countNews.classList.remove("d-none");
		countNews.innerHTML = `
            <div class="mt-3 bg-info rounded p-3">
                <h2 class="text-light fs-5 fw-bold">${arr.length} Items Found For Category Entertainment</h2>
            </div>
        `;
	} else {
		countNews.classList.remove("d-none");
		countNews.innerHTML = `
            <div class="mt-3 bg-info rounded p-3">
                <h2 class="text-light fs-5 fw-bold">${arr.length} Items Found For Category Entertainment</h2>
            </div>
        `;
	}

	arr.forEach((arr_item) => {
		console.log(arr_item);

		const div = document.createElement("div");

		div.classList.add("row", "mb-4");

		div.innerHTML = `
            <div class="col-md-4">
                <img
                    src="${
						arr_item.image_url
							? arr_item.image_url
							: "No News Found"
					}"
                    class="img-fluid rounded-start"
                    alt="News Image"
                />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${
						arr_item.title ? arr_item.title : "No Author Found"
					}</h5>
                    <p class="card-text">
                        ${
							arr_item.details
								? arr_item.details.slice(0, 150) + "..."
								: "No Details Found"
						}
                    </p>
                    <div class="card-text d-flex flex-row justify-content-between">
                        <div class="d-flex flex-row gap-4">
                            <img src="${
								arr_item.author.img
									? arr_item.author.img
									: "No Author Image Found"
							}" class="img-fluid img-responsive rounded-circle" alt="Author Image" height="20em" width="50em"/>

                            <div class="d-flex flex-column gap-1">
                                <h5 style="font-size:16px">${
									arr_item.author.name
										? arr_item.author.name
										: "No Author Found"
								}</h5>
                                <p>${
									arr_item.author.published_date
										? arr_item.author.published_date
										: "No Date Found"
								}</p>
                            </div>
                        </div>

                        <div>
                            <h5>${
								arr_item.total_view
									? arr_item.total_view
									: "No "
							} Views</h5>
                        </div>

                        <div class="d-xxl-inline d-xl-inline d-lg-inline d-md-inline d-sm-none d-none">
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>

                        <div class="d-xxl-inline d-xl-inline d-lg-inline d-md-inline d-sm-none d-none">
                            <a onclick="details_of_news('${
								arr_item._id
							}')" class="" href="#">
                                <i class="fa-solid fa-arrow-right" style="font-size:1.5em" data-bs-toggle="modal"  data-bs-target="#newsDetailModal">
                                </i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

		news_card_items.appendChild(div);
	});

    
	toggleSpinner(false);
};


const details_of_news = async (id) => {
	console.log(id);

	const url = `https://openapi.programming-hero.com/api/news/${id}`;
	try {
		const res = await fetch(url);
		const data = await res.json();

		// console.log( data.data );

		/* 
            Loading News Modal Detail
        */
		modal_detail(data.data);
	} catch (error) {
		console.log(error);
	}
};

// ***** modal_detail function
const modal_detail = (arr) => {
	// console.log( arr );

	const modal_title = document.getElementById("newsDetailModalLabel");
	modal_title.innerText = arr[0].title ? arr[0].title : "No Hot News Today!";

	const modal_detail = document.getElementById("modalDetails");
	modal_detail.innerHTML = `
        <p>${arr[0].details ? arr[0].details : "No details found!"}</p>
    `;
};

/*********  
    Displaying Categorywise News Starts ********/




/* 
    loading news in Home page by default to show some news on Home page
*/
loading_Categorywise_News('08');



/* 
    spinner code below
*/
const toggleSpinner = (isloading) => {
	const loaderSection = document.getElementById("loader");

	if (isloading) {
		loaderSection.classList.remove("d-none");
	} else {
		loaderSection.classList.add("d-none");
	}
};