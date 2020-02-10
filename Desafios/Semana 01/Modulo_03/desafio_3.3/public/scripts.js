const courses = document.querySelectorAll('.curso')

for (let course of courses) {
    course.addEventListener("click", function(){
        const courseId = course.getAttribute("id")
        window.location.href = `/courses?id=${courseId}`  // redireciona para a pagina passada (/video?id=...)
    })
}