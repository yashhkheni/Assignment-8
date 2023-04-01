$(document).ready(function() {
		$.ajax({
			url: "characters.json",
			dataType: "json",
			success: function(data) {
				$.each(data.characters, function(index, character) {
					$('#characters-table tbody').append(`
						<tr>
							<td>${character.firstName}</td>
							<td>${character.lastName}</td>
							<td>${character.gender}</td>
							<td>${character.village}</td>
							<td>${character.occupation}</td>
						</tr>
					`);
				});

				
				$('#search-input').on('input', function() {
					var searchTerm = $(this).val().toLowerCase();
					if (searchTerm.length > 0) {
						
						$('#characters-table tbody tr').each(function() {
							var firstName = $(this).find('td:first').text().toLowerCase();
							if (firstName.includes(searchTerm)) {
								$(this).addClass('highlighted');
							} else {
								$(this).removeClass('highlighted');
							}
						});
												} else {
							$('#characters-table tbody tr').removeClass('highlighted');
						}
					});

					
					$('#filter-A-M').on('click', function() {
						$(this).addClass('active');
						$('#filter-N-Z').removeClass('active');
						$('#characters-table tbody tr').each(function() {
							var lastName = $(this).find('td:nth-child(2)').text().charAt(0).toLowerCase();
							if (lastName >= 'a' && lastName <= 'm') {
								$(this).show();
							} else {
								$(this).hide();
							}
						});
						$('#filter-A-M').text('A - M (' + $('#characters-table tbody tr:visible').length + ')');
						$('#filter-N-Z').text('N - Z (' + $('#characters-table tbody tr:hidden').length + ')');
					});

					$('#filter-N-Z').on('click', function() {
						$(this).addClass('active');
						$('#filter-A-M').removeClass('active');
						$('#characters-table tbody tr').each(function() {
							var lastName = $(this).find('td:nth-child(2)').text().charAt(0).toLowerCase();
							if (lastName >= 'n' && lastName <= 'z') {
								$(this).show();
							} else {
								$(this).hide();
							}
						});
						$('#filter-A-M').text('A - M (' + $('#characters-table tbody tr:hidden').length + ')');
						$('#filter-N-Z').text('N - Z (' + $('#characters-table tbody tr:visible').length + ')');
					});
				}
			});
		});