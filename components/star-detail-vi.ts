/**
 * Bản tiếng Việt cho luận giải sao trong StarDetailPanel.
 * Giữ nguyên lối luận kiểu Trung Quốc: thuật ngữ đọc Hán-Việt, giọng văn đoán mệnh cổ điển.
 * 星曜详解越南语版：术语用汉越音，保留中式命理口吻。
 */

export interface StarDetailVi {
  niHaixia: string;
  classical: string;
  bestPalace: string;
  worstPalace: string;
  career: string;
  relationship: string;
  wealth: string;
  health: string;
}

export const STAR_DETAILS_VI: Record<string, StarDetailVi> = {
  '紫微': {
    niHaixia: 'Nghê sư cho rằng Tử Vi là sao Hoàng đế, người có Tử Vi tọa Mệnh mang khí cô ngạo, thích ở một mình, không ưa bị người khác quản thúc. Tử Vi cần Tả Phù, Hữu Bật giáp hai bên mới phát huy được khí chất đế vương, nếu không chỉ là "cô quân", giàu mà không sang. Tử Vi ở cung Thìn, Tuất là tốt nhất, cùng Thiên Phủ thành thế song tinh, tài quan song mỹ, có thể xuất tướng nhập tướng. Tử Vi sợ nhất Hỏa Tinh, Linh Tinh, Kình Dương, Đà La đồng cung; gặp sát tinh thì cô quý, có quyền mà không có tiền.',
    classical: 'Cổ quyết: «Tử Vi đế tọa lâm Mệnh, chủ tôn quý, thống lĩnh chúng tinh; người tọa Mệnh chủ quyền uy hiển đạt.» Nam Bắc Sơn Nhân chú: «Tử Vi thủ Mệnh tại Thìn, tài quan song mỹ, xuất tướng nhập tướng, vị chí Tam công; an Mệnh tại Tý thì phú quý không bền, về sau không đẹp.»',
    bestPalace: 'Mệnh (Thìn, Tuất), Quan Lộc',
    worstPalace: 'Tật Ách, Phu Thê',
    career: 'Chính trường, tầng lớp quản lý, tự lập nghiệp; trời sinh khí chất đế vương, hợp với vị trí lãnh đạo tự mình gánh vác một phương',
    relationship: 'Tình cảm bị động, lòng tự tôn cao, cần đối phương chủ động, có khuynh hướng cô độc; muộn hôn thì cát',
    wealth: 'Tài vận ổn định, giữ của giỏi hơn tiến thủ; ở Thìn, Tuất tài quan song mỹ, hợp nhất với đầu tư kiểu tích lũy',
    health: 'Thuộc Thổ, lưu ý tỳ vị, hệ tiêu hóa. Kỵ làm việc quá sức, nên giữ nếp sinh hoạt điều độ',
  },
  '天机': {
    niHaixia: 'Nghê sư nói Thiên Cơ là sao Tham mưu, ngôi sao thông minh nhất, nhưng thông minh lộ ra ngoài thì hại thân. Thiên Cơ Hóa Kỵ là phiền nhất, ứng với câu "khôn quá hóa dại". Thiên Cơ thuộc Mộc, linh động hay biến, người tọa Mệnh tư duy nhanh nhạy nhưng thường nhiều mưu ít quyết, phải rời quê đi xa mới phát triển được; ứng biến tùy cơ là đặc chất lớn nhất.',
    classical: 'Cổ quyết: «Làm người sinh tinh hoạt, tự thích kinh doanh; Thiên Cơ thuộc Mộc, buôn bán đều nhiều cơ kiến, ly tông tất viễn thân, cơ mưu tất xa lìa thân thích.» Nam Bắc Sơn Nhân chú: «Thiên Cơ ở đất Miếu Vượng, chủ người tinh minh, giỏi hoạch định; ở đất Hãm thì ảm đạm, phần nhiều theo nghề buôn bán.»',
    bestPalace: 'Mệnh (tại Mão), Quan Lộc',
    worstPalace: 'Phu Thê',
    career: 'Chuyên gia kỹ thuật, mưu sĩ, nhà nghiên cứu, IT, hoạch định; dùng đầu óc hơn dùng tay chân, hợp ly hương lập nghiệp',
    relationship: 'Tình cảm hay đổi, suy nghĩ quá nhiều, khó chuyên nhất; nên muộn hôn, sau khi cưới cần học buông bớt lo nghĩ',
    wealth: 'Kiếm tiền nhờ trí tuệ và kỹ năng, không giỏi giữ của; lấy kỹ thuật chuyên môn làm nghề thì tài vận ổn định',
    health: 'Thuộc Mộc, lưu ý can đởm, hệ thần kinh. Tâm tư nặng nề dễ mất ngủ, nên tập tĩnh tâm, thiền định',
  },
  '太阳': {
    niHaixia: 'Nghê sư cho rằng Thái Dương là sao của chủ nghĩa đại nam nhân, từ Mão đến Ngọ thì nhập Miếu, quang minh chính đại; quá Ngọ thì dần lạc Hãm. Người Thái Dương tọa Mệnh khảng khái, trọng thể diện; nam mệnh hợp, nữ mệnh thì quá cường thế. Thái Dương đại diện cho cha và bậc trưởng bối; ở Mệnh chủ tính cách hướng ngoại, cởi mở, thích được mọi người nhìn thấy, hợp nhất với công chức hoặc sự nghiệp công chúng. Người lạc Hãm thì trước siêng sau lười, cô quả lao lực.',
    classical: 'Cổ quyết: «Thái Dương cư Ngọ là nhập Miếu, quang huy rực rỡ, chủ quý hiển, nam mệnh tốt nhất; lạc Hãm thì cô quả lao lực, trước siêng sau lười.» Nam Bắc Sơn Nhân chú: «Thái Dương thủ Mệnh tại Ngọ, tài quan song mỹ, xuất tướng nhập tướng; an Mệnh tại Thìn, trung niên tài quan chuyển đẹp, người sinh năm Ất dù gặp hung cũng đại lợi.»',
    bestPalace: 'Mệnh (Mão đến Ngọ), Quan Lộc',
    worstPalace: 'Phu Thê (nữ mệnh), Tật Ách',
    career: 'Công chức, chính trường, quản lý, quan hệ công chúng, giáo dục, truyền thông; thích đứng trước đám đông, hợp sự nghiệp công chúng',
    relationship: 'Nam mệnh duyên tốt nhưng đa tình; nữ mệnh độc lập cường thế, hôn nhân cần mài giũa, nên tìm người bạn đời dịu dàng chu đáo',
    wealth: 'Tài vận nhờ nỗ lực, khảng khái hay cho, không giỏi tích lũy; nhập Miếu tài vận vượng, lạc Hãm tài vận lên xuống',
    health: 'Thuộc Hỏa, lưu ý tim, mắt. Ở vị trí lạc Hãm dễ quá sức, cần chú ý nghỉ ngơi đầy đủ',
  },
  '武曲': {
    niHaixia: 'Nghê sư xem Vũ Khúc là chủ tinh của Tài Bạch, cương ngạnh bất khuất, sợ nhất cô khắc. Người Vũ Khúc tọa Mệnh ý chí kiên định, hợp tài chính, quản lý tiền bạc, nhưng tình cảm quá thẳng, dễ làm tổn thương người khác. Vũ Khúc Hóa Kỵ phải cẩn thận tai nạn huyết quang. Vũ Khúc ở Thìn Tuất Sửu Mùi đắc vượng địa, cùng Thất Sát đồng cung có thể thành "Tướng tài cách", là cách cục tài phú cực tốt.',
    classical: 'Cổ quyết: «Vũ Khúc thuộc Kim, tính cương cường, một đời nhiều hình khắc; thủ Mệnh ở vượng địa thì xuất tướng nhập tướng.» Nam Bắc Sơn Nhân chú: «Vũ Khúc thủ Mệnh, tam phương tứ chính đều cát, tài quan song mỹ; võ chức gia Phụ Bật, Xương Khúc cũng chủ đại quý; cùng Thất Sát đồng cung là Tướng tài cách, chủ đại phú.»',
    bestPalace: 'Mệnh (Thìn Tuất Sửu Mùi), Tài Bạch, Quan Lộc',
    worstPalace: 'Phu Thê',
    career: 'Tài chính, quân đội cảnh sát, kế toán, kỹ thuật công trình; năng lực thực thi cực mạnh, hợp lĩnh vực cần khí phách và sự quyết đoán',
    relationship: 'Tình cảm thẳng tới thẳng lui, thiếu tình thú, cần bạn đời dịu dàng bổ khuyết; kỵ tình cảm cô khắc',
    wealth: 'Bản mệnh là tài tinh, tài vận cực mạnh, năng lực quản lý tiền bạc vượt trội; ở Thìn Tuất tài quan song mỹ',
    health: 'Thuộc Kim, lưu ý phổi, hệ hô hấp, răng. Khi Hóa Kỵ cần đề phòng tai nạn huyết quang',
  },
  '天同': {
    niHaixia: 'Nghê sư nói Thiên Đồng là Phúc tinh, cũng là ngôi sao lười nhất. Người Thiên Đồng tọa Mệnh thích hưởng phúc, không ưa cạnh tranh, hợp công việc ổn định. Thiên Đồng cùng Thiên Lương đồng cung là tốt nhất, vừa hưởng phúc vừa có bảo đảm. Thiên Đồng Hóa Lộc là Hóa Lộc đẹp nhất, chủ một đời cơm áo không lo, vui vẻ thong dong. Thiên Đồng kỵ lạc Hãm, lạc Hãm thì phúc giảm, cần cát tinh hóa giải hung tinh.',
    classical: 'Cổ quyết: «Thiên Đồng là sao Phúc Đức, tọa Mệnh hưởng phúc có thừa, chủ một đời tiêu dao tự tại, chẳng cần lao khổ.» Nam Bắc Sơn Nhân chú: «Thiên Đồng thủ Mệnh, tam phương không sát, một đời vui vẻ, cơm áo đầy đủ; gia cát tinh thì phú quý song toàn, làm người ôn hòa, được lòng người.»',
    bestPalace: 'Mệnh, Phúc Đức',
    worstPalace: 'Quan Lộc',
    career: 'Ngành dịch vụ, giải trí, ẩm thực, văn nghệ; môi trường nhẹ nhàng vui vẻ là hợp nhất, kỵ cạnh tranh áp lực cao',
    relationship: 'Tình cảm ôn hòa, không chủ động, dễ bị động tiếp nhận; hôn nhân tương đối ổn định, tính cách dễ gần',
    wealth: 'Tài vận không nổi bật, dựa vào lương ổn định, không giỏi đầu cơ; cơm áo không lo nhưng khó đại phú',
    health: 'Thuộc Thủy, lưu ý thận, bàng quang. Thể chất khá yếu, nên vận động vừa phải, giữ tâm thái thư thái',
  },
  '廉贞': {
    niHaixia: 'Nghê sư cho rằng Liêm Trinh là "thứ đào hoa", tài hoa tràn đầy nhưng tình cảm phức tạp. Liêm Trinh Hóa Kỵ rất hung, ứng với quan tụng, lao ngục, tai nạn. Liêm Trinh cùng Thiên Tướng đồng cung thì hóa hung thành cát, thành cách "hành chính ấn thụ". Liêm Trinh ngũ hành thuộc Hỏa, tính tình cương liệt, một đời nhiều thăng trầm, tài nghệ xuất chúng; nếu giữ được chính đạo không sa tà thì có thể thành đại khí.',
    classical: 'Cổ quyết: «Liêm Trinh là thứ đào hoa, tài hoa tràn đầy, tình cảm nhiều sóng gió; Liêm Tướng đồng cung, hóa hung thành cát, thành cách hành chính ấn thụ, có thể nắm quyền bính.» Nam Bắc Sơn Nhân chú: «Liêm Trinh thủ Mệnh, gặp cát tinh thì tài hoa xuất chúng, Hóa Kỵ thì quan tụng quấn thân, chủ tai huyết quang, phải đề phòng.»',
    bestPalace: 'Quan Lộc (phối Thiên Tướng), Mệnh (khi Hóa Lộc)',
    worstPalace: 'Mệnh (khi Hóa Kỵ), Phu Thê',
    career: 'Nghệ thuật, giải trí, pháp luật, công chức (phối Thiên Tướng); tài nghệ xuất chúng, nên giữ nghề chính đáng mới bền lâu',
    relationship: 'Đào hoa nhiều, tình cảm phức tạp, dễ gặp tranh chấp tình cảm; nên muộn hôn, chọn bạn đời chín chắn',
    wealth: 'Tài vận lên xuống, mưu sinh nhờ tài nghệ; khi Hóa Kỵ phải phòng tranh chấp tài chính và rủi ro pháp lý',
    health: 'Thuộc Hỏa, lưu ý tim, máu, gan. Khi Hóa Kỵ phòng tai nạn và phẫu thuật, để ý huyết quang',
  },
  '天府': {
    niHaixia: 'Nghê sư nói Thiên Phủ là sao Tài khố, ngôi sao thủ thành, không chủ động phát tài nhưng giữ được của cải. Người Thiên Phủ tọa Mệnh chín chắn bảo thủ; nữ mệnh tốt nhất, có thể vượng phu hưng gia. Thiên Phủ thích nhất Tử Vi đồng cung hoặc đối chiếu, thành thế song tinh, tài quan song mỹ. Thiên Phủ sợ Không Kiếp giáp, gặp Không Kiếp thì tài khố cạn đáy, không giữ được tiền.',
    classical: 'Cổ quyết: «Thiên Phủ là sao Tài khố, người thủ Mệnh chín chắn bảo thủ, chủ tích tài vượng gia; nữ mệnh gặp được thì vượng phu ích tử, gia đạo hưng long.» Nam Bắc Sơn Nhân chú: «Thiên Phủ thủ Mệnh, tam phương cát tụ, tài quan song mỹ, phú quý an khang; gặp Không Kiếp thì tài khố phá lậu, khó tích tài.»',
    bestPalace: 'Mệnh, Tài Bạch, Điền Trạch',
    worstPalace: 'Thiên Di',
    career: 'Quản lý hành chính, tài vụ, bảo hiểm, bất động sản; cầu ổn không mạo hiểm, hợp nghề nghiệp kiểu thủ thành',
    relationship: 'Tình cảm ổn định, chăm lo gia đình, là người bạn đời tốt, coi trọng cảm giác an toàn và bảo đảm kinh tế của gia đình',
    wealth: 'Tài vận cực tốt, năng lực giữ của mạnh, hợp nhất với đầu tư tích lũy và tậu bất động sản',
    health: 'Thuộc Thổ, lưu ý tỳ vị, tiêu hóa. Thể chất vững vàng, nên giữ ăn uống và sinh hoạt điều độ',
  },
  '太阴': {
    niHaixia: 'Nghê sư cho rằng Thái Âm là Tài tinh, lợi cho nữ mệnh, cũng là sao đại diện cho mẹ và vợ của nam mệnh. Thái Âm nhập Miếu thì tài vận cực tốt, ở đất Hãm thì tài vận bị trở ngại. Thái Âm Hóa Kỵ phải để ý vấn đề của người thân là nữ. Thái Âm ở Hợi, Tý nhập Miếu, quang huy chiếu khắp, đại diện cho sự tao nhã tinh tế, tình cảm phong phú, coi trọng thế giới nội tâm và đời sống tinh thần.',
    classical: 'Cổ quyết: «Thái Âm là Tài tinh, lợi nữ mệnh; Hợi Tý nhập Miếu, quang huy chiếu khắp, tài vận cực vượng; Ngọ vị lạc Hãm, ưu uất đa tình, tài vận bình đạm.» Nam Bắc Sơn Nhân chú: «Thái Âm thủ Mệnh, nhập Miếu thì tài phú dồi dào, nữ mệnh càng tốt; lạc Hãm thì phải nỗ lực mới giàu được, tình cảm tinh tế.»',
    bestPalace: 'Mệnh (Hợi, Tý), Tài Bạch',
    worstPalace: 'Mệnh (đất Hãm tại Ngọ)',
    career: 'Tài vụ, tài chính, bất động sản, nghệ thuật, giáo dục; tinh tế nhẫn nại, hợp nghề cần thẩm mỹ và sự dịu dàng',
    relationship: 'Tình cảm dịu dàng tinh tế, coi trọng cảm nhận nội tâm, cần một mối quan hệ ổn định có cảm giác an toàn',
    wealth: 'Nhập Miếu thì tài vận cực vượng, lạc Hãm thì phải nỗ lực; quản lý tiền cẩn thận, giỏi tích lũy, không giỏi mạo hiểm',
    health: 'Thuộc Thủy, lưu ý thận, tử cung (nữ mệnh). Cảm xúc dao động ảnh hưởng sức khỏe, nên giữ tâm tình thư thái',
  },
  '贪狼': {
    niHaixia: 'Nghê sư nói Tham Lang là ngôi sao đa tài đa nghệ nhất, đào hoa nặng nhất. Tham Lang Hóa Lộc nhập Mệnh thì sức hút tỏa khắp bốn phía, ai gặp cũng mến. Tham Lang thuộc sao phát muộn, sau trung niên mới thật sự phát đạt. Tham Lang ở Dần, Thân nhập Miếu là tốt nhất, đào hoa vượng thịnh, tài nghệ vượt trội; sau khi Hóa Lộc tài vận đại phát, nhưng nếu gặp Không Kiếp thì một đời nhiều sóng gió, khó tụ tài.',
    classical: 'Cổ quyết: «Tham Lang phát phúc hanh thông, đa tài đa nghệ, đào hoa nặng nhất; song khó qua tuổi ba mươi, người phát muộn chiếm đa số. Lạc Hãm gặp sát lại thành cát, đó là lý của Tham Lang lạc Hãm.» Nam Bắc Sơn Nhân chú: «Tham Lang thủ Mệnh, gặp cát thì phúc lộc thọ nhiều, phát phúc hanh thông; nhưng lâu về sau khó được thiện chung, nên tu thân dưỡng đức mới được thiện chung.»',
    bestPalace: 'Mệnh (Hóa Lộc), Phúc Đức, Thiên Di',
    worstPalace: 'Tật Ách',
    career: 'Nghệ thuật, giải trí, quan hệ công chúng, bán hàng, phong thủy ngũ thuật; dựa vào nhân mạch và tài nghệ, thuộc kiểu đa tài đa nghệ',
    relationship: 'Đào hoa cực vượng, tình cảm đa dạng; nên muộn hôn, sau khi cưới cần tiết chế đào hoa mới bạc đầu giai lão',
    wealth: 'Kiếm tiền nhờ nhân mạch và tài nghệ, tài vận đến trung vãn niên mới vững; sau Hóa Lộc tài nguyên rộng mở, thời trẻ nên giữ ổn định',
    health: 'Thuộc Mộc (kiêm Thủy), lưu ý gan, thận. Đào hoa quá vượng dễ hao tổn tinh lực, nên tiết chế điều dưỡng',
  },
  '巨门': {
    niHaixia: 'Nghê sư cho rằng Cự Môn là sao khẩu thiệt thị phi, nhưng khi Hóa Lộc, Hóa Quyền thì chuyển cát, thành cách cục kiếm tiền nhờ tài ăn nói. Người Cự Môn tọa Mệnh đa nghi, giỏi biện luận, hợp làm luật sư, giáo viên, bán hàng. Cự Môn kỵ nhất Hóa Kỵ, chủ khẩu thiệt thị phi không dứt, thậm chí dẫn đến kiện tụng. Cự Môn ở Tý, Ngọ khá tốt, ăn nói giỏi, chủ lấy lời nói lập thân.',
    classical: 'Cổ quyết: «Cự Môn là ám diệu, chủ khẩu thiệt thị phi; Hóa Lộc Quyền thì chuyển thành lấy tài ăn nói mưu sinh, chủ phú quý.» Nam Bắc Sơn Nhân chú: «Cự Môn thủ Mệnh, gặp Hóa Lộc Quyền, người lấy miệng lưỡi làm nghề thì đại cát; Hóa Kỵ thì khẩu thiệt liên lụy, quan tụng quấn thân, cần cẩn trọng lời nói.»',
    bestPalace: 'Quan Lộc (Hóa Lộc Quyền), Mệnh (Tý, Ngọ)',
    worstPalace: 'Phu Thê, Tật Ách (Hóa Kỵ)',
    career: 'Luật sư, giáo viên, bán hàng, người dẫn chương trình, chuyên gia đàm phán; tài ăn nói là năng lực cạnh tranh cốt lõi',
    relationship: 'Đa nghi đa lự, dễ nghĩ quá nhiều; giao tiếp là chìa khóa của hôn nhân, cần chọn bạn đời nhẫn nại',
    wealth: 'Kiếm tiền nhờ tài ăn nói và kỹ năng chuyên môn; sau Hóa Lộc tài vận khá tốt, Hóa Kỵ thì phòng tranh chấp tài chính, khẩu thiệt liên lụy',
    health: 'Thuộc Thủy, lưu ý thận, tai, khoang miệng. Lo nghĩ nhiều dễ hại thân, nên học cách thư giãn giảm áp lực',
  },
  '天相': {
    niHaixia: 'Nghê sư nói Thiên Tướng là sao Ấn thụ, phụ trách hành chính thứ vụ. Người Thiên Tướng tọa Mệnh khuôn phép mực thước, hợp công chức hành chính. Thiên Tướng cần nhất có sao mạnh phối hợp mới phát huy được, một mình tọa Mệnh thì khá bình đạm. Thiên Tướng thích nhất Liêm Trinh đi cùng, thành cách Liêm Tướng, có thể chủ đại quyền hành chính; sợ nhất Phá Quân đồng cung, thành cách "Hình Kỵ giáp Ấn", chủ hung hiểm.',
    classical: 'Cổ quyết: «Thiên Tướng là sao Ấn thụ, chủ hành chính thứ vụ; Liêm Tướng đồng cung, hóa hung thành cát, nắm đại quyền hành chính.» Nam Bắc Sơn Nhân chú: «Thiên Tướng thủ Mệnh, khuôn phép mực thước, hợp công chức; được Liêm Trinh phối hợp có thể thành rường cột quốc gia; Phá Quân cùng thủ thì khó tránh hình khắc.»',
    bestPalace: 'Quan Lộc, Mệnh (phối Liêm Trinh)',
    worstPalace: 'Tài Bạch, Mệnh (phối Phá Quân thì Hình Kỵ giáp Ấn)',
    career: 'Công chức, quản lý hành chính, thư ký, trợ lý; giỏi vai trò hỗ trợ phụ tá, cần sao mạnh dẫn đường',
    relationship: 'Tình cảm ổn định, trung hậu thật thà, là người bạn đời tốt, nhưng cần đối phương định hướng',
    wealth: 'Tài vận bình ổn, tích lũy nhờ lương, không hợp đầu tư mạo hiểm, quản lý tiền kiểu thủ thành là hợp nhất',
    health: 'Thuộc Thủy, lưu ý thận, hệ bạch huyết. Thể chất trung bình, nên giữ thói quen sinh hoạt điều độ',
  },
  '天梁': {
    niHaixia: 'Nghê sư cho rằng Thiên Lương là Ấm tinh, có thể che chở người khác, cũng đại diện cho y dược, tôn giáo. Người Thiên Lương tọa Mệnh có duyên với bậc trưởng bối, thời trẻ nhiều gian nan, về già hưởng phúc. Thiên Lương sợ nhất Hóa Kỵ, ứng với bậc trưởng bối hoặc sức khỏe có vấn đề. Thiên Lương cùng Thái Dương đồng cung là tốt nhất, Nhật Nguyệt tịnh minh, quý nhân che chở, một đời có quý nhân tương trợ, cuối cùng được bình an.',
    classical: 'Cổ quyết: «Thiên Lương là Ấm tinh, chủ che chở bảo hộ; người tọa Mệnh có duyên với trưởng bối, thời trẻ chịu rèn luyện, về già hưởng thanh phúc.» Nam Bắc Sơn Nhân chú: «Thiên Lương thủ Mệnh, phải gặp cát tinh mới phát đạt; gặp Thái Dương đồng cung, Nhật Nguyệt tịnh minh, chủ quý hiển, một đời nhiều quý nhân tương trợ.»',
    bestPalace: 'Mệnh, Phụ Mẫu, Phúc Đức',
    worstPalace: 'Mệnh (khi Hóa Kỵ), Tài Bạch',
    career: 'Y tế, tôn giáo, pháp luật, công tác xã hội, từ thiện; thích giúp người, có tấm lòng che chở mọi người',
    relationship: 'Tình cảm thường với người chênh lệch tuổi khá lớn, hoặc duyên đến muộn; cần kiên nhẫn chờ đợi mới gặp lương duyên',
    wealth: 'Tài vận nhờ quý nhân tương trợ, thời trẻ tài vận không tốt, về già mới vững; nên giữ không nên xông',
    health: 'Thuộc Thổ, lưu ý tỳ vị, xương cốt. Cần coi trọng chăm sóc sức khỏe tuổi già, nên sớm phòng ngừa điều dưỡng',
  },
  '七杀': {
    niHaixia: 'Nghê sư nói Thất Sát là sao Tướng quân, quả quyết, xung lực mạnh, nhưng mang tính cô khắc. Thất Sát tọa Mệnh nhất định phải có phụ tinh hóa giải tính cô, nếu không lục thân duyên bạc. Thất Sát cùng Vũ Khúc đồng cung là Tướng tài cách, cực tốt. Thất Sát sợ nhất "Trúc La tam hạn" (Dương Đà Hỏa Linh cùng chiếu), chủ đại hung, phải phòng tai nạn. Thất Sát sau khi Hóa Lộc lại thành cát, có thể thành bậc đại tướng chi tài.',
    classical: 'Cổ quyết: «Thất Sát là sao Tướng quân, quả quyết xung lực mạnh; người thủ Mệnh tính cô khắc nặng, lục thân duyên bạc.» Nam Bắc Sơn Nhân chú: «Thất Sát thủ Mệnh, tam hợp cát tụ thì đại quý; gặp Trúc La tam hạn (Dương Đà Hỏa Linh), chủ đại hung, phòng tai họa bất ngờ, phòng hình khắc.»',
    bestPalace: 'Mệnh (có phụ tinh), Quan Lộc',
    worstPalace: 'Phu Thê, Phụ Mẫu',
    career: 'Quân đội cảnh sát, khởi nghiệp, giao dịch tài chính, lĩnh vực tự gánh một phương; cần quyết đoán nhanh và khí phách',
    relationship: 'Tình cảm cô khắc, khó tìm được bạn đời phù hợp, cần người bao dung được cá tính mạnh; nên muộn hôn',
    wealth: 'Tài vận dao động lớn, có cơ hội đại phú nhưng cũng đại khởi đại lạc; cùng Vũ Khúc đồng cung thành Tướng tài cách, đại quý',
    health: 'Thuộc Kim, lưu ý phổi, đại tràng. Tính tình nóng nảy dễ hại thân, nên học kiềm chế cảm xúc và tu thân',
  },
  '破军': {
    niHaixia: 'Nghê sư nói Phá Quân là ngôi sao giỏi phá cũ lập mới nhất, cũng là một trong những sao cô khắc nhất. Phá Quân sau khi Hóa Lộc mới chuyển tốt, ứng với phá rồi mới lập. Người Phá Quân tọa Mệnh lục thân duyên bạc, nhưng năng lực khai sáng cực mạnh. Phá Quân hợp nhất với cải cách, sáng tạo; khi Hóa Lộc tài vận chuyển vượng, một phá một lập, cuối cùng thành tựu sự nghiệp.',
    classical: 'Cổ quyết: «Phá Quân là sao giỏi phá cũ lập mới nhất, người tọa Mệnh cô khắc, lục thân duyên bạc, song năng lực khai sáng siêu cường; sau Hóa Lộc phá rồi mới lập, có thể thành đại nghiệp.» Nam Bắc Sơn Nhân chú: «Phá Quân thủ Mệnh, một đời nhiều sóng gió; người Hóa Lộc, sau phá tài mới tái dựng được, tài vận rốt cuộc chuyển tốt, chủ về già có thành tựu.»',
    bestPalace: 'Quan Lộc (Hóa Lộc), Thiên Di',
    worstPalace: 'Phu Thê, Phụ Mẫu',
    career: 'Sự nghiệp khai sáng, quân đội cảnh sát, cải cách, quản lý biến đổi; hợp công việc tiên phong không ngừng mở lĩnh vực mới',
    relationship: 'Tình cảm nhiều sóng gió, ly hợp bất định, lục thân duyên bạc; cần chọn bạn đời độc lập và bao dung',
    wealth: 'Tài vận lên xuống lớn, sau Hóa Lộc tài vận chuyển tốt; thủ thành thì tài thoái, phải không ngừng mở cục diện mới mới tích được tài',
    health: 'Thuộc Thủy, lưu ý thận, bàng quang, hệ sinh dục. Thể chất lên xuống, nên giữ thói quen vận động đều đặn',
  },
};

/** Ghi chú ngắn cho phụ tinh, sát tinh (vi) — khớp với bản tiếng Trung trong StarDetailPanel */
export const MINOR_STAR_NOTES: Record<string, { vi: string; zh: string }> = {
  文昌: { vi: 'Văn Xương nhập cung, chủ học hành thi cử thuận lợi, văn thư ấn tín có lợi, nên làm công việc liên quan đến chữ nghĩa. Cổ quyết: «Văn Xương khoa giáp, chủ văn chương hiển đạt, gặp thi tất đỗ.»', zh: '文昌入宫，主学业考试顺利，文书印鉴有利，宜从事文字相关工作。古诀：「文昌科甲，主文章显达，逢考必第。」' },
  文曲: { vi: 'Văn Khúc nhập cung, chủ tài nghệ xuất chúng, ăn nói giỏi, khéo biểu đạt, thiên phú nghệ thuật mạnh. Cổ quyết: «Văn Khúc là sao tài nghệ, năng văn năng võ, khẩu tài hơn người.»', zh: '文曲入宫，主才艺出众，口才佳，善于表达，艺术天赋强。古诀：「文曲为才艺之星，能文能武，口才胜人。」' },
  左辅: { vi: 'Tả Phù nhập cung, chủ quý nhân tương trợ, có người nâng đỡ, việc của cung này được hậu thuẫn thiện ý. Cổ quyết: «Tả Phù là sao trợ lực, tọa Mệnh thì quý nhân nhiều, gặp hung hóa cát.»', zh: '左辅入宫，主贵人相助，有人提携，该宫位事项受到善意支持。古诀：「左辅为助力之星，坐命则贵人多，逢凶化吉。」' },
  右弼: { vi: 'Hữu Bật nhập cung, chủ quý nhân tương trợ, phần nhiều là quý nhân nữ, việc của cung này có người hiệp trợ. Cổ quyết: «Hữu Bật là sao âm trợ, nhiều quý nhân nữ, hóa hiểm thành an.»', zh: '右弼入宫，主贵人相助，多出女性贵人，该宫位事项有人协助。古诀：「右弼为阴助之星，多女性贵人，化险为夷。」' },
  天魁: { vi: 'Thiên Khôi nhập cung, chủ quý nhân của người sinh ban ngày, quý nhân nam nhiều, có sức gặp hung hóa cát. Cổ quyết: «Thiên Khôi là Thiên Ất quý nhân, gặp được tất có quý nhân phò trì.»', zh: '天魁入宫，主白天出生的贵人，男性贵人多，逢凶化吉之力。古诀：「天魁为天乙贵人，逢之必有贵人扶持。」' },
  天钺: { vi: 'Thiên Việt nhập cung, chủ quý nhân của người sinh ban đêm, quý nhân nữ nhiều, thêm khí cát tường. Cổ quyết: «Thiên Việt là Ngọc Đường quý nhân, chủ âm trợ, quý nhân nữ nhiều.»', zh: '天钺入宫，主夜晚出生的贵人，女性贵人多，增添吉祥之气。古诀：「天钺为玉堂贵人，主阴助，女贵人多。」' },
  禄存: { vi: 'Lộc Tồn nhập cung, chủ tài lộc thủ thành, cung này có tài khí nhưng thuộc tài vận kiểu bảo thủ. Cổ quyết: «Lộc Tồn là sao tài lộc, chủ giữ của có thừa, tiến tài vững chắc.»', zh: '禄存入宫，主财禄守成，该宫位有财气，但属于保守型财运。古诀：「禄存为财禄之星，主守财有余，进财稳健。」' },
  天马: { vi: 'Thiên Mã nhập cung, chủ bôn ba biến động, trong động cầu tài; nên chủ động xuất kích, không nên ôm cây đợi thỏ. Cổ quyết: «Thiên Mã chủ động, gặp Lộc thì tài lộc song toàn, trong động sinh tài.»', zh: '天马入宫，主奔波动荡，动中求财，宜主动出击，不宜守株待兔。古诀：「天马主动，逢禄则财禄双全，动中生财。」' },
  地空: { vi: 'Địa Không nhập cung, chủ việc của cung này có cảm giác hụt hẫng, tinh thần hao tán, nên chú ý sức khỏe tâm lý. Cổ quyết: «Địa Không chủ hư hao, nhập Mệnh phần nhiều tinh thần mê mang, phải phòng mộng tưởng.»', zh: '地空入宫，主该宫位事项有落空感，精神耗散，宜注意心理健康。古诀：「地空主虚耗，入命宫者多精神迷茫，须防空想。」' },
  地劫: { vi: 'Địa Kiếp nhập cung, chủ việc của cung này có tổn thất bất ngờ, tiền của cần thận trọng, phòng tiểu nhân. Cổ quyết: «Địa Kiếp chủ kiếp tài, nhập Mệnh thì tài vận bị tổn, phòng mất mát bất ngờ.»', zh: '地劫入宫，主该宫位事项有意外损失，财物需谨慎，防小人。古诀：「地劫主劫财，入命宫者财运受损，防意外之失。」' },
  火星: { vi: 'Hỏa Tinh nhập cung, chủ việc của cung này nóng vội xung động, cảm xúc dao động, nhưng nếu gặp Tham Lang thì lại cát. Cổ quyết: «Hỏa Tinh chủ cấp táo, song gặp Tham Lang đồng cung lại thành cách Hỏa Tham, chủ bạo phát.»', zh: '火星入宫，主该宫位事项急躁冲动，情绪波动，但若遇贪狼则反吉。古诀：「火星主急燥，然遇贪狼同宫，反为火贪格，主暴发。」' },
  铃星: { vi: 'Linh Tinh nhập cung, chủ việc của cung này có trở ngại ngầm, phòng tiểu nhân sau lưng, mọi việc nên kín đáo. Cổ quyết: «Linh Tinh chủ ám sát, nhập Mệnh phần nhiều bị địch ngầm, phải phòng thị phi sau lưng.»', zh: '铃星入宫，主该宫位事项有暗中阻碍，防背后小人，凡事宜低调。古诀：「铃星主暗煞，入命者多暗中受敌，须防背后是非。」' },
  擎羊: { vi: 'Kình Dương nhập cung, chủ hình khắc, việc của cung này nhiều trắc trở, có tai huyết quang hoặc bất trắc. Cổ quyết: «Kình Dương là sao hình khắc, nhập Mệnh phần nhiều hình khắc, phải phòng bất trắc huyết quang.»', zh: '擎羊入宫，主刑克，该宫位事项多波折，有血光之灾或意外。古诀：「擎羊为刑克之星，入命宫者多刑克，须防意外血光。」' },
  陀罗: { vi: 'Đà La nhập cung, chủ thị phi quấn thân, việc của cung này dây dưa không quyết, mọi việc nên chuẩn bị sớm. Cổ quyết: «Đà La chủ thị phi kéo dài, nhập Mệnh thì làm việc chậm chạp, phải phòng vướng víu không dứt.»', zh: '陀罗入宫，主是非缠身，该宫位事项拖延不决，凡事宜早做准备。古诀：「陀罗主是非拖延，入命宫者做事迟缓，须防纠缠不清。」' },
};
