import { useParams } from "react-router-dom";

const NoticiaDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const noticias = [
    {
      id: "1",
      titulo: "Paróquia de Maranguape recebe novo vigário, Pe. Rafael Nascimento Rocha",
      conteudo: `A Paróquia Nossa Senhora da Penha, no Centro de Maranguape, acolherá o Pe. Rafael Nascimento Rocha como novo vigário paroquial. Ordenado presbítero em 22 de dezembro de 2023, o sacerdote tem como lema de vida "Miserando atque eligendo" – "O olhou com misericórdia e o elegeu" (Mt 9,9).\n
Natural da Paróquia São José, na Lagoa Redonda, Pe. Rafael trilhou sua formação pastoral em diversas comunidades da Arquidiocese de Fortaleza e dedicou-se ao serviço ao próximo como Ministro Extraordinário da Sagrada Comunhão.\n
A missa de apresentação do novo vigário será celebrada no dia 09 de fevereiro de 2025, na Igreja Matriz da Paróquia Nossa Senhora da Penha. A comunidade está convidada a participar deste momento especial de acolhida e bênçãos.`,
      imagem: "/noticia1.jpeg",
      alt: "Novo Vigário de Maranguape",
    },
    {
      id: "2",
      titulo: "As Indulgências no Ano Jubilar 2025",
      conteudo: `<b>por Gianni Valente</b><br>
Em 2025 a Igreja Católica repropõe a celebração do Ano Jubilar como um tempo especial de remissão e perdão, ocasião para viver intensamente a cura e a libertação dos pecados e de outras "dívidas" que pesam sobre as vidas e as almas.<br>
A possibilidade de pedir e obter indulgências é parte integrante e relevante da tradição dos Jubileus. «Não é por acaso que, na antiguidade, o termo “misericórdia” era cambiável com o de “indulgência”, precisamente porque pretende exprimir a plenitude do perdão de Deus que não conhece limites», escreve o Papa Francisco na Bula que anuncia o Jubileu de 2025 (*Spes non confundit* § 23).<br>
O que se segue é um breve vademecum ("manual") que contém as indicações elementares sobre o que é preciso fazer - em Roma, na Terra Santa e em todas as partes do mundo - para pedir o dom da indulgência durante o Jubileu.<br>
<b>O que é Indulgência</b><br>
«A indulgência é a remissão, diante de Deus, da pena temporal devida pelos pecados já perdoados quanto à culpa, que o fiel, devidamente disposto e em certas condições, alcança por meio da Igreja, a qual, como dispensadora da redenção, distribui e aplica, com autoridade, o tesouro das satisfações de Cristo e dos Santos» (Codex Iuris Canonici, Can. 992).<br>
<b>O que é a pena temporal</b><br>
O pecado tem duas consequências. Em primeiro lugar, se for grave, envolve a privação da comunhão com Deus e a pena eterna. Ele é cancelado toda vez que se recorre frutuosamente ao Sacramento da Confissão e assim se é readmitido à comunhão com Deus no estado de graça sobrenatural.<br>
Em segundo lugar, todo o pecado, mesmo venial, traz consigo um apego desordenado às criaturas, o qual precisa de ser purificado, quer nesta vida quer depois da morte, no estado que se chama Purgatório.<br>
Esta purificação liberta do que se chama «pena temporal» do pecado. Esta pena pode ser redimida aqui em baixo, na terra, ou na vida após a morte, no purgatório.<br>

<b>O que é a Indulgência Plenária</b><br>
A Indulgência Plenária por si só perdoa toda a pena temporal dos pecados já perdoados no que diz respeito à culpa (o que, para os pecados mortais, requer necessariamente a Confissão sacramental).<br>

<b>Quem pode obter as indulgências</b><br>
Qualquer pessoa batizada e não excomungada pode obter indulgências. Para lucrá-las, o fiel batizado deve estar na graça de Deus, isto é, sem pecado mortal, porque a dívida da pena temporal não pode ser perdoada senão após o cancelamento da culpa e a remissão da pena eterna operada pelo Sacramento da Confissão ou, na impossibilidade de confessar-se, por um ato de sincera contrição, com o propósito de buscar o sacramento da penitência assim que possível. É necessária, ademais, a intenção de obter a indulgência, pois o benefício é concedido apenas a quem positivamente pretende recebê-lo.<br>

<b>Como obter a Indulgência Plenária</b><br>
Para obter a Indulgência Plenária, além de cumprir o ato ao qual a Igreja agrega a indulgência, devem ser sempre cumpridas as seguintes condições:<br>
<ul>
  <li>- Confessar-se (a confissão deve ser “individual e íntegra”);</li>
  <li>- Receber a comunhão eucarística;</li>
  <li>- Rezar de acordo com as intenções do Papa (por exemplo, um Pai Nosso e uma Ave Maria).</li>
</ul>

<b>Como cada fiel pode obter diariamente a Indulgência Plenária durante o Jubileu do Ano 2025</b><br>
As normas para a concessão da Indulgência durante o Jubileu ordinário do Ano de 2025, publicadas em 13 de maio de 2024 pela Penitenciária Apostólica, cujo Penitenciário-Mor é o cardeal Angelo De Donatis, indicam os atos que poderão levar a cada dia à aquisição da Indulgência Plenária durante toda a duração do Ano Santo.<br>
Além de observar as condições habituais (desapego do pecado, mesmo venial, confissão sacramental, comunhão eucarística e oração segundo as intenções do Santo Padre), para receber diariamente a Indulgência Plenária jubilar o fiel poderá praticar atos de diferentes naturezas, como segue:<br>

<b>Peregrinações e visitas a lugares sagrados</b><br>
Os fiéis poderão obter a Indulgência Jubilar quando se dirigirem em peregrinação a qualquer lugar sagrado do Jubileu, participando naquele local na Santa Missa, ou na Via Sacra, ou na recitação do Santo Rosário ou do hino Akathistos; ou a uma celebração penitencial, que termine com as confissões individuais dos penitentes.<br>

- Em Roma e na Itália<br>
Caso estiverem em Roma, para pedir a indulgência plenária, os fiéis poderão peregrinar pelo menos a uma das quatro Basílicas Papais Maiores (São Pedro no Vaticano, Santissimo Salvador em Latrão, Santa Maria Maior, São Paulo Fora-dos-Muros).<br>
Por ocasião particular do Ano Jubilar, além dos referidos locais de peregrinação, também poderão ser visitadas a Basílica de Santa Croce em Jerusalém, a Basílica de San Lorenzo al Verano, a Basílica de São Sebastião (etapas que completam a visita chamada “das sete Igrejas”, tão cara a São Filipe Neri), o Santuário do Amor Divino, a Igreja de Santo Spirito in Sassia, a Igreja de São Paulo alle Tre Fontane (lugar de martírio do Apóstolo), as Catacumbas Cristãs.<br>
Ademais, se poderá visitar - e ali realizar as práticas piedosas exigidas - as igrejas dos caminhos jubilares dedicadas respectivamente ao Iter Europaeum e as igrejas dedicadas às Padroeiras da Europa e Doutoras da Igreja (Basílica de Santa Maria sopra Minerva, Santa Brigida em Campo de' Fiori, Igreja de Santa Maria della Vittoria, Igreja de Trinità dei Monti, Basílica de Santa Cecília em Trastevere, Basílica de Sant'Agostino em Campo Marzio).<br>
Na Itália, poderão ser realizadas peregrinações jubilares também às duas Basílicas Papais menores de Assis, de São Francisco e de Santa Maria dos Anjos; as Basílicas Pontifícias de Nossa Senhora de Loreto, de Nossa Senhora de Pompeia, de Santo Antônio em Pádua.<br>

- Na Terra Santa<br>
Na terra de Jesus será possível realizar peregrinações jubilares e pedir a Indulgência Plenária visitando pelo menos uma das três Basílicas do Santo Sepulcro em Jerusalém, da Natividade em Belém, da Anunciação em Nazaré.<br>

- Em todo o mundo<br>
Nas outras circunscrições eclesiásticas, os fiéis poderão alcançar a Indulgência Jubilar se, individualmente ou em grupo, visitarem com devoção qualquer lugar sagrado (Basílicas menores, igrejas catedrais, santuários marianos) designado como lugar jubilar por cada bispo diocesano, como também santuários nacionais ou internacionais, indicados pelas Conferências Episcopais, e ali, por um adequado período de tempo, praticarem a Adoração Eucarística e a meditação, concluindo com o Pai Nosso, a Profissão de Fé em qualquer forma legítima e invocações a Maria, Mãe de Deus.<br>
Os fiéis sinceramente arrependidos, mas impossibilitados de participar nas peregrinações e visitas piedosas por motivos graves (por exemplo, monges e monjas de clausura, os doentes e os reclusos), podem lucrar a Indulgência Jubilar nas mesmas condições se, unidos em espírito com os fiéis presentes, especialmente nos momentos em que as palavras do Sumo Pontífice ou dos Bispos diocesanos forem transmitidas pelos meios de comunicação, recitarem o Pai Nosso, a Profissão de fé em qualquer forma legítima e outras orações conformes aos propósitos do Ano Santo.<br>

<b>Obras de misericórdia e de penitência</b><br>
Além disso, sem realizar peregrinações ou visitas piedosas aos lugares jubilares, os fiéis poderão lucrar a Indulgência Jubilar:<br>

- Participando nas Missões Populares;<br>
- Participando de Exercícios Espirituais ou Encontros de Formação sobre textos do Concílio Vaticano II e do Catecismo da Igreja Católica, a serem realizados em uma igreja ou outro local adequado;<br>
- Realizando Obras de Misericórdia corporais e espirituais;<br>
- Realizando Atos Penitenciais como:<br>

a) Redescobrir o valor penitencial da sexta-feira, abstendo-se durante pelo menos um dia de distrações fúteis (induzidas, por exemplo, pelos meios de comunicação e redes sociais) e de consumos supérfluos (por exemplo, jejuando ou praticando a abstinência segundo as normas gerais da Igreja e dedicar uma quantia proporcional de dinheiro aos pobres);<br>

b) Apoiar obras de caráter religioso ou social, especialmente em favor da defesa e proteção da vida em todas as suas fases, das crianças abandonadas, dos jovens em dificuldade, dos idosos necessitados ou solitários, dos migrantes dos vários países;<br>

c) Dedicar uma parte razoável do seu tempo livre a atividades voluntárias que sejam de interesse da comunidade ou a outras formas semelhantes de compromisso pessoal.<br>

Apesar da regra geral segundo a qual só se pode lucrar somente uma Indulgência Plenária por dia (ver Enchiridion Indulgentiarum, IV ed., norma 18, § 1), a instrução da Penitenciária Apostólica com as normas para receber Indulgências Plenárias durante o Ano Jubilar 2025 determina que “os fiéis que terão praticado o ato de caridade a favor das almas do Purgatório, se se aproximarem legitimamente do sacramento da Comunhão uma segunda vez no mesmo dia, poderão obter duas vezes no mesmo dia a Indulgência plenária, aplicável apenas aos defuntos (entende-se no âmbito de uma celebração eucarística).`,
      imagem: "/jubilar.png",
      alt: "Ano Jubilar",
    },
  ];

  const noticia = noticias.find((noticia) => noticia.id === id);

  if (!noticia) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-500">Notícia não encontrada</h1>
        <p className="text-gray-600">A notícia solicitada não existe ou foi removida.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1
        style={{ color: "#063265", fontSize: "35.2px" }}
        className="font-bold text-center mb-4"
      >
        {noticia.titulo}
      </h1>
      <img
        src={noticia.imagem}
        alt={noticia.alt}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p
        style={{ color: "#1D1D1D", fontSize: "19px" }}
        className="whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
      ></p>
    </div>
  );
};

export default NoticiaDetalhe;